Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('c:\projects\Futura-Edtech\public\FunWithMagnets\city_grid_track_map.jpg')

# We want to find local peaks of glowing orange/yellow pixels
# Orange/yellow glow: High Red (>200), High Green (>120), Low/Med Blue (<100) or high brightness
# Let's inspect regions around row 0, 1, 2, 3 and col 0, 1, 2, 3
Write-Output "Image Dimensions: $($bmp.Width) x $($bmp.Height)"

# Let's search in 16 bounding boxes:
# cols approximate: 0-60, 310-370, 630-690, 960-1024
# rows approximate: 0-60, 200-260, 420-480, 620-682

$colRanges = @(
    @{ minX = 0; maxX = 60 },
    @{ minX = 300; maxX = 380 },
    @{ minX = 630; maxX = 710 },
    @{ minX = 960; maxX = 1024 }
)

$rowRanges = @(
    @{ minY = 0; maxY = 60 },
    @{ minY = 200; maxY = 270 },
    @{ minY = 420; maxY = 490 },
    @{ minY = 620; maxY = 682 }
)

for ($r = 0; $r -lt 4; $r++) {
    for ($c = 0; $c -lt 4; $c++) {
        $cR = $colRanges[$c]
        $rR = $rowRanges[$r]
        
        $sumX = 0.0
        $sumY = 0.0
        $totalWeight = 0.0
        
        for ($x = $cR.minX; $x -lt [Math]::Min($bmp.Width, $cR.maxX); $x++) {
            for ($y = $rR.minY; $y -lt [Math]::Min($bmp.Height, $rR.maxY); $y++) {
                $p = $bmp.GetPixel($x, $y)
                # Orange/yellow ring: R > 180, G > 100, B < 80, or brightness in orange hue
                if ($p.R -gt 180 -and $p.G -gt 100 -and $p.B -lt 100) {
                    $w = ($p.R + $p.G - 2 * $p.B)
                    $sumX += $x * $w
                    $sumY += $y * $w
                    $totalWeight += $w
                }
            }
        }
        if ($totalWeight -gt 0) {
            $avgX = [Math]::Round($sumX / $totalWeight, 1)
            $avgY = [Math]::Round($sumY / $totalWeight, 1)
            Write-Output "Node ($r, $c): X = $avgX, Y = $avgY (weight=$totalWeight)"
        } else {
            Write-Output "Node ($r, $c): Not found with strict filter"
        }
    }
}

$bmp.Dispose()
