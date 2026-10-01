Add-Type -AssemblyName System.Drawing

function Extract-GlowingLinesLayer($inputPath, $outputPath, $referenceBmpPath) {
    # Match the exact dimensions and bounds of the cropped jeep image
    $refBmp = [System.Drawing.Bitmap]::FromFile($referenceBmpPath)
    $w = $refBmp.Width
    $h = $refBmp.Height
    $refBmp.Dispose()
    
    # We load the full image and crop with the exact same rectangle as in extract script
    $bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
    
    # Find bounding box as before
    $minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
    for ($y = 0; $y -lt $bmp.Height; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            $maxC = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
            if ($maxC -gt 15) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    $pad = 4
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = $w
    $cropH = $h
    
    $rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $cropped = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bmp.Dispose()
    
    $outBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Lock bits for fast processing
    $bRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
    $srcData = $cropped.LockBits($bRect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outData = $outBmp.LockBits($bRect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $bytes = [Math]::Abs($srcData.Stride) * $cropH
    $srcPixels = New-Object byte[] $bytes
    $outPixels = New-Object byte[] $bytes
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcPixels, 0, $bytes)
    
    $stride = $srcData.Stride
    
    # Isolate ONLY the golden yellow magnetic lines and arrows (upper half, golden color)
    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $idx = $y * $stride + $x * 4
            $b = [double]$srcPixels[$idx]
            $g = [double]$srcPixels[$idx + 1]
            $r = [double]$srcPixels[$idx + 2]
            
            # Yellow lines have high R, high G, and R >= G > B (golden/yellow hues)
            # Above the jeep body (y < 460)
            if ($y -lt 470 -and $r -gt 80 -and $g -gt 60 -and ($r + $g) -gt ($b * 2.2)) {
                # Exclude the magnet itself (where blue is dominant or pure red/blue body)
                # Magnet body has very low G for red part (G < 70, R > 150) or B > 120
                $isMagnet = ($b -gt 130 -and $r -lt 80) -or ($r -gt 150 -and $g -lt 70)
                
                if (!$isMagnet) {
                    # Glowing yellow/gold line pixel!
                    $intensity = [Math]::Max($r, $g) / 255.0
                    $alpha = [Math]::Min(255.0, $intensity * 255.0)
                    
                    # Boost golden yellow radiance
                    $outR = [Math]::Min(255.0, $r * 1.15 + 20)
                    $outG = [Math]::Min(255.0, $g * 1.15 + 15)
                    $outB = [Math]::Min(255.0, $b * 0.9)
                    
                    $outPixels[$idx] = [byte][Math]::Round($outB)
                    $outPixels[$idx + 1] = [byte][Math]::Round($outG)
                    $outPixels[$idx + 2] = [byte][Math]::Round($outR)
                    $outPixels[$idx + 3] = [byte][Math]::Round($alpha)
                    continue
                }
            }
            
            # Transparent otherwise
            $outPixels[$idx] = 0
            $outPixels[$idx + 1] = 0
            $outPixels[$idx + 2] = 0
            $outPixels[$idx + 3] = 0
        }
    }
    
    [System.Runtime.InteropServices.Marshal]::Copy($outPixels, 0, $outData.Scan0, $bytes)
    $cropped.UnlockBits($srcData)
    $outBmp.UnlockBits($outData)
    
    $outBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created glowing lines overlay: $outputPath ($cropW x $cropH)"
    
    $cropped.Dispose()
    $outBmp.Dispose()
}

$destDir = "c:\projects\Futura-Edtech\public\MagnetInteraction"

Extract-GlowingLinesLayer `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846396019.jpg" `
  "$destDir\magnetic_glowing_lines_left.png" `
  "$destDir\jeep_with_magnet_and_lines_left.png"

Extract-GlowingLinesLayer `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846402266.jpg" `
  "$destDir\magnetic_glowing_lines_right_attract.png" `
  "$destDir\jeep_with_magnet_and_lines_right_attract.png"

Extract-GlowingLinesLayer `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846962849.jpg" `
  "$destDir\magnetic_glowing_lines_right_repel.png" `
  "$destDir\jeep_with_magnet_and_lines_right_repel.png"
