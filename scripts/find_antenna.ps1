Add-Type -AssemblyName System.Drawing

function Find-AntennaCenter($path) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    Write-Host "Analyzing antenna in $path (Size: $($bmp.Width) x $($bmp.Height))"
    
    # Check rows in middle of antenna (e.g. y = 300..380)
    for ($y = 280; $y -le 360; $y += 20) {
        $minAntennaX = 9999; $maxAntennaX = 0
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            # Antenna is silver / gray: r,g,b are close to each other and brightness is > 100
            if ($c.A -gt 200 -and $c.R -gt 80 -and [Math]::Abs($c.R - $c.G) -lt 30 -and [Math]::Abs($c.R - $c.B) -lt 30) {
                if ($x -lt $minAntennaX) { $minAntennaX = $x }
                if ($x -gt $maxAntennaX) { $maxAntennaX = $x }
            }
        }
        $centerX = ($minAntennaX + $maxAntennaX) / 2.0
        Write-Host " y=${y}: Antenna X range = ${minAntennaX} .. ${maxAntennaX} (Center X = ${centerX})"
    }
    $bmp.Dispose()
}

Find-AntennaCenter "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_left.png"
Write-Host "---"
Find-AntennaCenter "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_attract.png"
