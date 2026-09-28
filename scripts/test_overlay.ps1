Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap('c:\projects\Futura-Edtech\public\FunWithMagnets\city_grid_track_map.jpg')
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

$nodes = @(
    @{ id='node_0_0'; x=29; y=18 },
    @{ id='node_0_1'; x=347; y=19 },
    @{ id='node_0_2'; x=672; y=19 },
    @{ id='node_0_3'; x=995; y=19 },
    @{ id='node_1_0'; x=25; y=234 },
    @{ id='node_1_1'; x=349; y=234 },
    @{ id='node_1_2'; x=675; y=233 },
    @{ id='node_1_3'; x=1000; y=234 },
    @{ id='node_2_0'; x=20; y=462 },
    @{ id='node_2_1'; x=346; y=462 },
    @{ id='node_2_2'; x=681; y=462 },
    @{ id='node_2_3'; x=1002; y=462 },
    @{ id='node_3_0'; x=18; y=659 },
    @{ id='node_3_1'; x=343; y=659 },
    @{ id='node_3_2'; x=680; y=659 },
    @{ id='node_3_3'; x=1008; y=660 }
)

$penLine = New-Object System.Drawing.Pen([System.Drawing.Color]::Cyan, 2)
$penRing = New-Object System.Drawing.Pen([System.Drawing.Color]::Magenta, 3)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Yellow)

# Draw horizontal lines
for ($r = 0; $r -lt 4; $r++) {
    for ($c = 0; $c -lt 3; $c++) {
        $n1 = $nodes[$r * 4 + $c]
        $n2 = $nodes[$r * 4 + $c + 1]
        $g.DrawLine($penLine, $n1.x, $n1.y, $n2.x, $n2.y)
    }
}
# Draw vertical lines
for ($c = 0; $c -lt 4; $c++) {
    for ($r = 0; $r -lt 3; $r++) {
        $n1 = $nodes[$r * 4 + $c]
        $n2 = $nodes[($r + 1) * 4 + $c]
        $g.DrawLine($penLine, $n1.x, $n1.y, $n2.x, $n2.y)
    }
}

foreach ($n in $nodes) {
    $g.DrawEllipse($penRing, $n.x - 8, $n.y - 8, 16, 16)
    $g.FillEllipse($brush, $n.x - 3, $n.y - 3, 6, 6)
}

$penLine.Dispose()
$penRing.Dispose()
$brush.Dispose()
$g.Dispose()

$bmp.Save('c:\projects\Futura-Edtech\public\FunWithMagnets\city_grid_track_map_debug.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Output "Saved debug overlay image"
