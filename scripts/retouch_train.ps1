Add-Type -AssemblyName System.Drawing

$srcPath = "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_floating.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$outBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb))

# Copy pixels and touch up tiny reversed text areas with surrounding body gradient/color
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        
        # Check if inside the small text zones on car bodies and replace with smooth white/silver metallic fill
        # Car 1 text zone around x: 1000-1100, y: 70-85
        # Car 2 text zone around x: 500-600, y: 100-118
        if (($x -gt 1020 -and $x -lt 1090 -and $y -gt 74 -and $y -lt 85) -or
            ($x -gt 500 -and $x -lt 640 -and $y -gt 105 -and $y -lt 120) -or
            ($x -gt 280 -and $x -lt 360 -and $y -gt 105 -and $y -lt 120) -or
            ($x -gt 90 -and $x -lt 130 -and $y -gt 74 -and $y -lt 85)) {
            # Use smooth grey/white body tone
            $sampleColor = $bmp.GetPixel($x, [Math]::Max(0, $y - 12))
            $outBmp.SetPixel($x, $y, $sampleColor)
        } else {
            $outBmp.SetPixel($x, $y, $c)
        }
    }
}

$bmp.Dispose()
$outBmp.Save("c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_retouched.png", [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

Remove-Item $srcPath
Move-Item "c:\projects\Futura-Edtech\public\FunWithMagnets\maglev_bullet_3car_retouched.png" $srcPath

Write-Host "Train sprite retouched perfectly!"
