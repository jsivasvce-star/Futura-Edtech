Add-Type -AssemblyName System.Drawing

function Extract-RefinedGlowingLines($inputPath, $outputPath, $referenceBmpPath) {
    $refBmp = [System.Drawing.Bitmap]::FromFile($referenceBmpPath)
    $cropW = $refBmp.Width
    $cropH = $refBmp.Height
    $refBmp.Dispose()
    
    $bmp = [System.Drawing.Bitmap]::FromFile($inputPath)
    
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
    
    $rect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $cropped = $bmp.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bmp.Dispose()
    
    $outBmp = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $bRect = New-Object System.Drawing.Rectangle(0, 0, $cropW, $cropH)
    $srcData = $cropped.LockBits($bRect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outData = $outBmp.LockBits($bRect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    $bytes = [Math]::Abs($srcData.Stride) * $cropH
    $srcPixels = New-Object byte[] $bytes
    $outPixels = New-Object byte[] $bytes
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcPixels, 0, $bytes)
    
    $stride = $srcData.Stride
    
    # Extract only lines and arrows, cut off cleanly above the jeep roof (y < 415)
    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $idx = $y * $stride + $x * 4
            $b = [double]$srcPixels[$idx]
            $g = [double]$srcPixels[$idx + 1]
            $r = [double]$srcPixels[$idx + 2]
            
            # Fade out near y = 390..415 to prevent any yellow shadow bleeding onto the jeep roof
            $yFade = 1.0
            if ($y -gt 415) {
                $yFade = 0.0
            } elseif ($y -gt 385) {
                $yFade = 1.0 - (($y - 385.0) / (415.0 - 385.0))
            }
            
            if ($yFade -gt 0.0 -and $r -gt 85 -and $g -gt 65 -and ($r + $g) -gt ($b * 2.2)) {
                $isMagnet = ($b -gt 130 -and $r -lt 80) -or ($r -gt 150 -and $g -lt 70)
                
                if (!$isMagnet) {
                    $intensity = [Math]::Max($r, $g) / 255.0
                    $alpha = [Math]::Min(255.0, $intensity * 255.0 * $yFade * 0.85) # Slightly softer alpha
                    
                    # Refined golden line color without harsh over-saturation
                    $outR = $r
                    $outG = $g
                    $outB = $b
                    
                    $outPixels[$idx] = [byte][Math]::Round($outB)
                    $outPixels[$idx + 1] = [byte][Math]::Round($outG)
                    $outPixels[$idx + 2] = [byte][Math]::Round($outR)
                    $outPixels[$idx + 3] = [byte][Math]::Round($alpha)
                    continue
                }
            }
            
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
    Write-Host "Created refined glowing lines: $outputPath"
    
    $cropped.Dispose()
    $outBmp.Dispose()
}

$destDir = "c:\projects\Futura-Edtech\public\MagnetInteraction"

Extract-RefinedGlowingLines `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846396019.jpg" `
  "$destDir\magnetic_glowing_lines_left.png" `
  "$destDir\jeep_with_magnet_and_lines_left.png"

Extract-RefinedGlowingLines `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846402266.jpg" `
  "$destDir\magnetic_glowing_lines_right_attract.png" `
  "$destDir\jeep_with_magnet_and_lines_right_attract.png"

Extract-RefinedGlowingLines `
  "C:\Users\akash\.gemini\antigravity-ide\brain\79d555ef-6aeb-4596-b0df-fef38419ac26\.user_uploaded\media_1790846962849.jpg" `
  "$destDir\magnetic_glowing_lines_right_repel.png" `
  "$destDir\jeep_with_magnet_and_lines_right_repel.png"
