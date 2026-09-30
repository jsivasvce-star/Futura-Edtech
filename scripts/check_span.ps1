Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("c:\projects\Futura-Edtech\public\MagnetInteraction\car_left_facing_right.png")
$w = $bmp.Width
$h = $bmp.Height

for ($y = 348; $y -lt $h; $y++) {
    $minX = 9999; $maxX = -1; $count = 0
    for ($x = 0; $x -lt $w; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 15) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            $count++
        }
    }
    Write-Host "Row $y : minX=$minX, maxX=$maxX, width=$($maxX - $minX), count=$count"
}
$bmp.Dispose()
