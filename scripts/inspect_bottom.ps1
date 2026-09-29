Add-Type -AssemblyName System.Drawing

function Inspect-BottomPixels($path) {
    Write-Host "=== Inspecting $path ==="
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    $w = $bmp.Width
    $h = $bmp.Height
    
    # Check each row in bottom 40 rows
    for ($y = $h - 40; $y -lt $h; $y++) {
        $blackish = 0
        $otherNonTrans = 0
        for ($x = 0; $x -lt $w; $x++) {
            $p = $bmp.GetPixel($x, $y)
            if ($p.A -gt 15) {
                # Check if it's very dark or black line
                if ($p.R -lt 55 -and $p.G -lt 55 -and $p.B -lt 55) {
                    $blackish++
                } else {
                    $otherNonTrans++
                }
            }
        }
        if ($blackish -gt 0 -or $otherNonTrans -gt 0) {
            Write-Host "y=$y : blackish=$blackish, other=$otherNonTrans"
        }
    }
    $bmp.Dispose()
}

Inspect-BottomPixels "c:\projects\Futura-Edtech\public\MagnetInteraction\car_left_facing_right.png"
Inspect-BottomPixels "c:\projects\Futura-Edtech\public\MagnetInteraction\car_right_facing_left.png"
