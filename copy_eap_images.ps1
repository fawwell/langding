$desktop = Join-Path $env:USERPROFILE 'Desktop'
$destDir = '.\frontend\public\images\eap'

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

$files = @('ai_scanning.jpg', 'manual_care.jpg', 'group_exercise.jpg', 'lecture.jpg')

foreach ($file in $files) {
    $src = Join-Path $desktop $file
    $dest = Join-Path $destDir $file
    
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dest -Force
        Write-Output "Successfully copied $file to $dest"
    } else {
        Write-Output "Warning: $file not found on Desktop"
    }
}
