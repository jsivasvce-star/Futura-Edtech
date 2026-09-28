Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('c:\projects\Futura-Edtech\public\FunWithMagnets\city_grid_track_map.jpg')

# For each estimated point, find the geometric centroid of the circular ring by checking the peak brightness/orange ring boundaries
$estimates = @(
    @{ r=0; c=0; x=30; y=17 },
    @{ r=0; c=1; x=349; y=20 },
    @{ r=0; c=2; x=674; y=20 },
    @{ r=0; c=3; x=993; y=18 },
    @{ r=1; c=0; x=28; y=234 },
    @{ r=1; c=1; x=348; y=234 },
    @{ r=1; c=2; x=677; y=234 },
    @{ r=1; c=3; x=998; y=235 },
    @{ r=2; c=0; x=22; y=462 },
    @{ r=2; c=1; x=348; y=462 },
    @{ r=2; c=2; x=681; y=462 },
    @{ r=2; c=3; x=1004; y=463 },
    @{ r=3; c=0; x=16; y=660 },
    @{ r=3; c=1; x=345; y=659 },
    @{ r=3; c=2; x=682; y=659 },
    @{ r=3; c=3; x=1010; y=660 }
)

foreach ($est in $estimates) {
    # Scan a 40x40 box around (x, y)
    $minX = [Math]::Max(0, $est.x - 20)
    $maxX = [Math]::Min($bmp.Width - 1, $est.x + 20)
    $minY = [Math]::Max(0, $est.y - 20)
    $maxY = [Math]::Min($bmp.Height - 1, $est.y + 20)
    
    $bestScore = 0
    $bestX = $est.x
    $bestY = $est.y
    
    # Check circular symmetry for candidate centers
    for ($cx = $minX + 5; $cx -le $maxX - 5; $cx++) {
        for ($cy = $minY + 5; $cy -le $maxY - 5; $cy++) {
            # Check ring intensity at radius R ~ 8 to 14
            $ringSum = 0
            $samples = 16
            for ($s = 0; $s -lt $samples; $s++) {
                $theta = $s * 2 * [Math]::PI / $samples
                $rx = [Math]::Round($cx + 10 * [Math]::Cos($theta))
                $ry = [Math]::Round($cy + 10 * [Math]::Sin($theta))
                if ($rx -ge 0 -and $rx -lt $bmp.Width -and $ry -ge 0 -and $ry -lt $bmp.Height) {
                    $p = $bmp.GetPixel($rx, $ry)
                    $ringSum += ($p.R * 2 + $p.G - $p.B)
                }
            }
            if ($ringSum -gt $bestScore) {
                $bestScore = $ringSum
                $bestX = $cx
                $bestY = $cy
            }
        }
    }
    Write-Output "Exact Node ($($est.r), $($est.c)): X = $bestX, Y = $bestY"
}

$bmp.Dispose()
