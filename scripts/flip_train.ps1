Add-Type -AssemblyName System.Drawing

$srcPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Flip horizontally so the train travels forward to the RIGHT
$bmp.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX)

$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        
        # Smooth out any residual rectangular artifacts in the corners
        if ($y -gt 135) {
            # Check if this pixel is in the far right (tail) or far left (rear) under-zone
            if ($x -gt ($bmp.Width - 165) -and $y -gt 135) {
                # Nose under-curve (now on the right)
                $relX = $x - ($bmp.Width - 165)
                # Curve threshold
                if ($y -gt (135 + ($relX * 0.35))) {
                    $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                    continue
                }
            }
            if ($x -lt 80 -and $y -gt 135) {
                $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                continue
            }
        }
        
        $outBmp.SetPixel($x, $y, $c)
    }
}

$bmp.Dispose()
$destCleanPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"
$outBmp.Save("c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_flipped.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

Remove-Item $destCleanPath
Move-Item "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_flipped.png" $destCleanPath

Write-Host "Train flipped and facing right!"
