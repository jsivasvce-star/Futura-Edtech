Add-Type -AssemblyName System.Drawing

$srcPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"
$destPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        
        # Eliminate the thin horizontal leftover rail under the nose (x < 180, y > 140) and tail (x > 1280, y > 140)
        if (($x -lt 165 -and $y -gt 135) -or ($x -gt 1290 -and $y -gt 135)) {
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            $outBmp.SetPixel($x, $y, $c)
        }
    }
}

$bmp.Dispose()
$outBmp.Save("c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_clean.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

Remove-Item $srcPath
Move-Item "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating_clean.png" $srcPath

Write-Host "Polished floating train sprite successfully!"
