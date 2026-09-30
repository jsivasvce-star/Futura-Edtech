$files = @(
    'c:\projects\Futura-Edtech\public\MagneticPoles\Barmag1.mp4',
    'c:\projects\Futura-Edtech\public\MagneticPoles\break3.mp4',
    'c:\projects\Futura-Edtech\public\MagneticPoles\Barmagnet.mp4',
    'c:\projects\Futura-Edtech\public\MagneticPoles\breaking_magnet_demonstration.mp4'
)

foreach ($f in $files) {
    if (Test-Path $f) {
        $bytes = [System.IO.File]::ReadAllBytes($f)
        $len = $bytes.Length
        $hdr = [System.Text.Encoding]::ASCII.GetString($bytes, 4, 8)
        Write-Host "$f : length=$len, type=$hdr"
    } else {
        Write-Host "$f NOT FOUND"
    }
}
