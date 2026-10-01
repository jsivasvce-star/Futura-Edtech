Add-Type -AssemblyName System.Drawing

function Extract-CleanAsset($inputPath, $outputPath, $flipMagnetOnly = $false) {
    $bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
    $w = $bmp.Width
    $h = $bmp.Height
    
    # 1. Lock source bitmap
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $srcData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $srcBytes = [Math]::Abs($srcData.Stride) * $h
    $srcPixels = New-Object byte[] $srcBytes
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcPixels, 0, $srcBytes)
    $bmp.UnlockBits($srcData)
    
    # 2. Prepare output 32bpp ARGB buffer
    $outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outData = $outBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outPixels = New-Object byte[] $srcBytes
    
    # Process pixels: Clean alpha extraction for glowing magnetic lines + solid objects
    # Thresholds:
    # Near black background noise: max(r,g,b) < 6 -> A = 0
    # Soft glow transition: max(r,g,b) from 6 to 255
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $srcData.Stride + $x * 4
            $b = [double]$srcPixels[$idx]
            $g = [double]$srcPixels[$idx + 1]
            $r = [double]$srcPixels[$idx + 2]
            
            $maxC = [Math]::Max($r, [Math]::Max($g, $b))
            
            if ($maxC -lt 5) {
                # Pure transparent background
                $outPixels[$idx] = 0
                $outPixels[$idx + 1] = 0
                $outPixels[$idx + 2] = 0
                $outPixels[$idx + 3] = 0
            } else {
                # Calculate alpha:
                # Solid bodies (wood, metal, magnet, bright lines) have high brightness / saturation
                # For glowing areas: alpha is proportional to maxC with a soft threshold curve
                # For maxC >= 180, alpha is 255 (fully solid)
                # For maxC between 5 and 180, smooth curve
                $alpha = 0.0
                if ($maxC -ge 160) {
                    $alpha = 255.0
                } else {
                    # Smooth hermite interpolation from 5 to 160
                    $t = ($maxC - 5.0) / (160.0 - 5.0)
                    $t = [Math]::Max(0.0, [Math]::Min(1.0, $t))
                    # Power curve for vibrant optical glow
                    $curve = [Math]::Pow($t, 0.75)
                    $alpha = $curve * 255.0
                }
                
                # Un-premultiply color so glow lines don't get darkened when blended over light background
                $aNorm = [Math]::Max(0.08, $alpha / 255.0)
                $newR = [Math]::Min(255.0, $r / $aNorm)
                $newG = [Math]::Min(255.0, $g / $aNorm)
                $newB = [Math]::Min(255.0, $b / $aNorm)
                
                # For solid parts like jeep wood / tires / antenna, preserve true colors
                if ($y -gt 450) {
                    # Lower half (jeep body) is solid: force full alpha for non-background pixels
                    if ($maxC -ge 20) {
                        $alpha = 255.0
                        $newR = $r
                        $newG = $g
                        $newB = $b
                    }
                }
                
                $outPixels[$idx] = [byte][Math]::Round($newB)
                $outPixels[$idx + 1] = [byte][Math]::Round($newG)
                $outPixels[$idx + 2] = [byte][Math]::Round($newR)
                $outPixels[$idx + 3] = [byte][Math]::Round($alpha)
            }
        }
    }
    
    [System.Runtime.InteropServices.Marshal]::Copy($outPixels, 0, $outData.Scan0, $srcBytes)
    $outBmp.UnlockBits($outData)
    
    # Trim transparent borders to tight bounding box
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $idx = $y * $outData.Stride + $x * 4
            $a = $outPixels[$idx + 3]
            if ($a -gt 15) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    # Add small 4px padding
    $pad = 4
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX + 1) + ($pad * 2))
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY + 1) + ($pad * 2))
    
    $cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $croppedBmp = $outBmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $croppedBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Saved: $outputPath ($cropW x $cropH)"
    
    $croppedBmp.Dispose()
    $outBmp.Dispose()
    $bmp.Dispose()
}

$destDir = "c:\projects\Futura-Edtech\public\MagnetInteraction"
if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force }

Extract-CleanAsset "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846396019.jpg" "$destDir\jeep_with_magnet_and_lines_left.png"

Extract-CleanAsset "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846402266.jpg" "$destDir\jeep_with_magnet_and_lines_right_attract.png"
