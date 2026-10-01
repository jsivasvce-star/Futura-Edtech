Add-Type -AssemblyName System.Drawing

function Measure-Image($path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Host "Image: $path ($($bmp.Width) x $($bmp.Height))"
    
    $minMagX = $bmp.Width; $maxMagX = 0; $minMagY = $bmp.Height; $maxMagY = 0
    # Find magnet
    for ($y = 0; $y -lt 400; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if (($c.R -gt 150 -and $c.G -lt 70 -and $c.B -lt 70) -or ($c.B -gt 150 -and $c.R -lt 70 -and $c.G -lt 100)) {
                if ($x -lt $minMagX) { $minMagX = $x }
                if ($x -gt $maxMagX) { $maxMagX = $x }
                if ($y -lt $minMagY) { $minMagY = $y }
                if ($y -gt $maxMagY) { $maxMagY = $y }
            }
        }
    }
    Write-Host "Magnet: X = $minMagX .. $maxMagX (width = $($maxMagX - $minMagX + 1)), Y = $minMagY .. $maxMagY (height = $($maxMagY - $minMagY + 1))"
    $magCenterX = ($minMagX + $maxMagX) / 2.0
    $magCenterY = ($minMagY + $maxMagY) / 2.0
    Write-Host "Magnet Center: ($magCenterX, $magCenterY)"
    
    # Find field lines extent
    $minLineX = $bmp.Width; $maxLineX = 0; $minLineY = $bmp.Height; $maxLineY = 0
    for ($y = 0; $y -lt 450; $y++) {
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            # Golden yellow line: high R and G, lower B
            if ($c.R -gt 180 -and $c.G -gt 140 -and $c.B -lt 100) {
                if ($x -lt $minLineX) { $minLineX = $x }
                if ($x -gt $maxLineX) { $maxLineX = $x }
                if ($y -lt $minLineY) { $minLineY = $y }
                if ($y -gt $maxLineY) { $maxLineY = $y }
            }
        }
    }
    Write-Host "Field Lines Extent: X = $minLineX .. $maxLineX, Y = $minLineY .. $maxLineY"
    $bmp.Dispose()
}

Measure-Image "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_left.png"
Write-Host "---"
Measure-Image "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_attract.png"
Write-Host "---"
Measure-Image "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_repel.png"
