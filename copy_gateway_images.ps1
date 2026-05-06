$desktop = Join-Path $env:USERPROFILE 'Desktop'
$destDir = '.\frontend\public\images\gateway'

if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# 파일명 검색 패턴 정의 (대소문자 무시)
function Copy-Smart {
    param($baseName, $destName)
    $found = Get-ChildItem $desktop | Where-Object { $_.BaseName -ieq $baseName }
    
    if ($found) {
        $src = $found[0].FullName
        $dest = Join-Path $destDir $destName
        Copy-Item -Path $src -Destination $dest -Force
        Write-Output "Successfully copied $($found[0].Name) to $dest"
    } else {
        Write-Output "Warning: No file named '$baseName' found on Desktop"
    }
}

Copy-Smart -baseName "ai_scanning" -destName "ai_scanning.png"
Copy-Smart -baseName "physical_care" -destName "physical_care.jpg"
Copy-Smart -baseName "mall" -destName "mall.jpg"
