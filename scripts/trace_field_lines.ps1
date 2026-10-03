Add-Type -AssemblyName System.Drawing

function Trace-FieldLines($imagePath) {
    $bmp = [System.Drawing.Bitmap]::FromFile($imagePath)
    Write-Host "Tracing $imagePath ($($bmp.Width) x $($bmp.Height))"
    
    # Let's inspect yellow pixels across horizontal and vertical slices
    # Horizontal slices across top field: y = 60, y = 100, y = 140, y = 180, y = 220, y = 260, y = 300, y = 340, y = 380
    $ySlices = @(40, 80, 120, 160, 200, 240, 280, 320, 360, 400)
    foreach ($y in $ySlices) {
        $yellowXs = @()
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            $c = $bmp.GetPixel($x, $y)
            if ($c.R -gt 170 -and $c.G -gt 130 -and $c.B -lt 100) {
                $yellowXs += $x
            }
        }
        # Group adjacent x's to find centers of line intersections
        $clusters = @()
        if ($yellowXs.Count -gt 0) {
            $currCluster = @($yellowXs[0])
            for ($i = 1; $i -lt $yellowXs.Count; $i++) {
                if ($yellowXs[$i] - $yellowXs[$i-1] -le 6) {
                    $currCluster += $yellowXs[$i]
                } else {
                    $avg = [Math]::Round(($currCluster | Measure-Object -Average).Average)
                    $clusters += $avg
                    $currCluster = @($yellowXs[$i])
                }
            }
            if ($currCluster.Count -gt 0) {
                $avg = [Math]::Round(($currCluster | Measure-Object -Average).Average)
                $clusters += $avg
            }
        }
        Write-Host " y=$y : line intersections at X = $($clusters -join ', ')"
    }
    $bmp.Dispose()
}

Trace-FieldLines "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_left.png"
Write-Host "===================="
Trace-FieldLines "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_attract.png"
Write-Host "===================="
Trace-FieldLines "c:\projects\Futura-Edtech\public\MagnetInteraction\jeep_with_magnet_and_lines_right_repel.png"
