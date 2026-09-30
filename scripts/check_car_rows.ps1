Add-Type -AssemblyName System.Drawing

function Check-CarImage($path) {
    Write-Host "Analyzing $path"
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    $w = $bmp.Width
    $h = $bmp.Height
    Write-Host "Width: $w, Height: $h"
    
    # Check bottom 20 rows
    for ($y = $h - 20; $y -lt $h; $y++) {
        $darkCount = 0
        $nonTrans = 0
        for ($x = 0; $x -lt $w; $x++) {
            $p = $bmp.GetPixel($x, $y)
            if ($p.A -gt 30) {
                $nonTrans++
                if ($p.R -lt 45 -and $p.G -lt 45 -and $p.B -lt 45) {
                    $darkCount++
                }
            }
        }
        if ($nonTrans -gt 0) {
            Write-Host "Row y=$y : non-trans=$nonTrans, dark=$darkCount"
        }
    }
    $bmp.Dispose()
}

Check-CarImage "c:\projects\Futura-Edtech\public\MagnetInteraction\car_left_facing_right.png"
Check-CarImage "c:\projects\Futura-Edtech\public\MagnetInteraction\car_right_facing_left.png"
