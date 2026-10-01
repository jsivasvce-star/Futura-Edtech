Add-Type -AssemblyName System.Drawing

function Build-AccurateRepelRight {
    $attractPath = "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_attract.png"
    $repelPath = "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_repel.png"
    
    $bmp = [System.Drawing.Bitmap]::FromFile($attractPath)
    $w = $bmp.Width
    $h = $bmp.Height
    
    $outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    
    # Antenna axis is at X = 638
    $antennaX = 638.0
    $splitY = 270 # Magnet base is at y ~ 260
    
    # Read all pixels
    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $srcData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bytes = [Math]::Abs($srcData.Stride) * $h
    $srcPixels = New-Object byte[] $bytes
    [System.Runtime.InteropServices.Marshal]::Copy($srcData.Scan0, $srcPixels, 0, $bytes)
    $bmp.UnlockBits($srcData)
    
    $outData = $outBmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $outPixels = New-Object byte[] $bytes
    
    $stride = $srcData.Stride
    
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $outIdx = $y * $stride + $x * 4
            
            if ($y -ge $splitY) {
                # Below split: copy jeep body & antenna as-is
                $outPixels[$outIdx] = $srcPixels[$outIdx]
                $outPixels[$outIdx + 1] = $srcPixels[$outIdx + 1]
                $outPixels[$outIdx + 2] = $srcPixels[$outIdx + 2]
                $outPixels[$outIdx + 3] = $srcPixels[$outIdx + 3]
            } else {
                # Above split: flip horizontally around antennaX
                $srcX = [int][Math]::Round(2.0 * $antennaX - $x)
                if ($srcX -ge 0 -and $srcX -lt $w) {
                    $srcIdx = $y * $stride + $srcX * 4
                    $outPixels[$outIdx] = $srcPixels[$srcIdx]
                    $outPixels[$outIdx + 1] = $srcPixels[$srcIdx + 1]
                    $outPixels[$outIdx + 2] = $srcPixels[$srcIdx + 2]
                    $outPixels[$outIdx + 3] = $srcPixels[$srcIdx + 3]
                } else {
                    $outPixels[$outIdx] = 0
                    $outPixels[$outIdx + 1] = 0
                    $outPixels[$outIdx + 2] = 0
                    $outPixels[$outIdx + 3] = 0
                }
            }
        }
    }
    
    [System.Runtime.InteropServices.Marshal]::Copy($outPixels, 0, $outData.Scan0, $bytes)
    $outBmp.UnlockBits($outData)
    
    $outBmp.Save($repelPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Created accurate repel right car asset: $repelPath"
    
    $outBmp.Dispose()
    $bmp.Dispose()
}

Build-AccurateRepelRight
