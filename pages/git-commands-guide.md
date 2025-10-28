---
title: "Git 명령어 완전 가이드 - 초보자를 위한 튜토리얼"
date: 2025-10-28
tags: ["Git", "버전관리", "개발도구", "튜토리얼", "협업"]
category: "Development"
description: "Git의 주요 명령어를 초보자도 쉽게 이해할 수 있도록 설명하는 완전 가이드입니다."
---

# Git 명령어 완전 가이드 - 초보자를 위한 튜토리얼

Git은 현대 소프트웨어 개발에서 필수적인 도구입니다. 이 가이드에서는 Git의 주요 명령어들을 하나씩 살펴보며, 초보자도 쉽게 이해할 수 있도록 설명하겠습니다.

## Git이란 무엇인가?

Git은 **분산 버전 관리 시스템**으로, 코드의 변경사항을 추적하고 여러 사람이 협업할 수 있도록 도와줍니다. Git을 사용하면:

- 코드의 변경 이력을 확인할 수 있습니다
- 이전 버전으로 되돌릴 수 있습니다
- 여러 개발자가 동시에 작업할 수 있습니다
- 백업과 복원이 쉽습니다

## 사전 준비: Git 설치 및 설정

### Git 설치

**Windows:**

```bash
# Chocolatey를 사용하는 경우
choco install git

# 또는 공식 설치 프로그램 다운로드
# https://git-scm.com/download/win
```

**macOS:**

```bash
# Homebrew를 사용하는 경우
brew install git

# 또는 Xcode Command Line Tools 설치
xcode-select --install
```

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install git
```

### 사용자 정보 설정

Git을 사용하기 전에 사용자 정보를 설정해야 합니다:

```bash
# 사용자 이름 설정 (전역)
git config --global user.name "홍길동"

# 이메일 주소 설정 (전역)
git config --global user.email "hong@example.com"

# 설정 확인
git config --list
```

## 1. 저장소 초기화

### `git init`

현재 디렉토리를 새로운 Git 저장소로 초기화합니다.

```bash
# 현재 폴더를 Git 저장소로 만들기
git init

# 특정 폴더를 Git 저장소로 만들기
git init my-project
cd my-project
```

초기화가 완료되면 `.git` 폴더가 생성됩니다. 이 폴더에는 Git의 모든 정보가 저장됩니다.

## 2. 파일 상태 확인

### `git status`

작업 디렉토리와 스테이징 영역의 상태를 확인합니다.

```bash
git status
```

출력 예시:

```
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be
   committed)
        README.md
        index.html

nothing added to commit but untracked files present (use "git add" to track)
```

## 3. 파일 추가 (스테이징)

### `git add`

변경된 파일을 스테이징 영역에 추가합니다.

```bash
# 특정 파일 추가
git add README.md

# 모든 파일 추가
git add .

# 패턴으로 파일 추가
git add *.html
git add src/
```

**스테이징 영역이란?**

- 커밋할 준비가 된 파일들이 모이는 곳
- `git add`로 파일을 스테이징 영역에 추가
- `git commit`으로 스테이징 영역의 파일들을 저장소에 저장

## 4. 커밋 생성

### `git commit`

스테이징 영역의 변경사항을 저장소에 영구적으로 저장합니다.

```bash
# 커밋 메시지와 함께 커밋
git commit -m "첫 번째 커밋: 프로젝트 초기화"

# 자세한 커밋 메시지 작성
git commit

# 스테이징과 커밋을 한 번에 (변경된 파일만)
git commit -am "간단한 수정"
```

**좋은 커밋 메시지 작성 팁:**

- 첫 줄: 간단하고 명확하게 (50자 이내)
- 두 번째 줄: 빈 줄
- 세 번째 줄 이후: 자세한 설명
- 현재 시제 사용: "Add feature" (O), "Added feature" (X)

## 5. 원격 저장소 연결

### `git remote`

로컬 저장소를 원격 저장소와 연결합니다.

```bash
# 원격 저장소 추가
git remote add origin https://github.com/username/repo.git

# 원격 저장소 목록 확인
git remote -v

# 원격 저장소 URL 변경
git remote set-url origin https://github.com/username/new-repo.git

# 원격 저장소 제거
git remote remove origin
```

## 6. 푸시와 풀

### `git push`

로컬 커밋을 원격 저장소로 업로드합니다.

```bash
# 현재 브랜치를 원격 저장소로 푸시
git push origin main

# 처음 푸시할 때 (upstream 설정)
git push -u origin main

# 모든 브랜치 푸시
git push --all origin

# 태그도 함께 푸시
git push --tags
```

### `git pull`

원격 저장소의 변경사항을 로컬로 가져옵니다.

```bash
# 원격 저장소의 변경사항 가져오기 및 병합
git pull origin main

# fetch 후 merge 따로 하기
git fetch origin
git merge origin/main
```

## 7. 브랜치 관리

### 브랜치 기본 명령어

```bash
# 브랜치 목록 확인
git branch

# 원격 브랜치 포함해서 확인
git branch -a

# 새로운 브랜치 생성
git branch feature/login

# 브랜치 생성과 동시에 전환
git checkout -b feature/login

# 브랜치 전환
git checkout main

# 브랜치 삭제 (병합된 경우)
git branch -d feature/login

# 브랜치 강제 삭제
git branch -D feature/login
```

### 브랜치 전략

**Git Flow 브랜치 전략:**

- `main`: 프로덕션 배포용
- `develop`: 개발용 메인 브랜치
- `feature/*`: 새로운 기능 개발
- `hotfix/*`: 긴급 버그 수정
- `release/*`: 배포 준비

## 8. 병합과 충돌 해결

### `git merge`

다른 브랜치의 변경사항을 현재 브랜치에 병합합니다.

```bash
# feature 브랜치를 main에 병합
git checkout main
git merge feature/login
```

### 충돌 해결

병합 중 충돌이 발생하면:

1. 충돌 파일 열기
2. `<<<<<<<`, `=======`, `>>>>>>>` 표시된 부분 수정
3. 변경사항 스테이징
4. 커밋

```bash
# 충돌 파일 확인
git status

# 충돌 해결 후 스테이징
git add conflicted-file.txt

# 병합 커밋
git commit
```

## 9. 로그와 히스토리

### `git log`

커밋 히스토리를 확인합니다.

```bash
# 기본 로그
git log

# 한 줄로 요약해서 보기
git log --oneline

# 그래프로 브랜치 히스토리 보기
git log --graph --oneline --all

# 특정 파일의 변경 이력
git log --follow -- filename.txt

# 최근 5개 커밋만 보기
git log -5
```

## 10. 되돌리기와 수정

### `git reset`

커밋을 취소합니다.

```bash
# 마지막 커밋 취소 (작업 디렉토리 유지)
git reset --soft HEAD~1

# 마지막 커밋 취소 (스테이징 영역 유지)
git reset --mixed HEAD~1

# 마지막 커밋 취소 (모든 변경사항 제거)
git reset --hard HEAD~1
```

### `git revert`

새로운 커밋으로 이전 커밋을 취소합니다.

```bash
# 특정 커밋 취소
git revert abc123

# 여러 커밋 취소
git revert HEAD~3..HEAD
```

## 11. .gitignore 파일

Git이 추적하지 않을 파일들을 지정합니다.

```bash
# .gitignore 파일 생성
touch .gitignore
```

**.gitignore 예시:**

```gitignore
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/

# OS generated files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# Environment variables
.env
.env.local
```

## 12. 태그 관리

### `git tag`

특정 커밋에 태그를 붙입니다.

```bash
# 경량 태그
git tag v1.0.0

# 주석 태그
git tag -a v1.0.0 -m "Version 1.0.0 release"

# 태그 목록 확인
git tag

# 태그로 체크아웃
git checkout v1.0.0

# 태그 푸시
git push origin v1.0.0
git push --tags
```

## 실전 예제: 프로젝트 시작하기

```bash
# 1. 프로젝트 폴더 생성
mkdir my-awesome-project
cd my-awesome-project

# 2. Git 저장소 초기화
git init

# 3. 사용자 정보 설정
git config user.name "홍길동"
git config user.email "hong@example.com"

# 4. README 파일 생성
echo "# My Awesome Project" > README.md

# 5. .gitignore 생성
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore

# 6. 파일 추가 및 커밋
git add .
git commit -m "Initial commit: 프로젝트 시작"

# 7. GitHub 저장소 생성 후 연결
git remote add origin https://github.com/username/my-awesome-project.git

# 8. 푸시
git push -u origin main
```

## 자주 발생하는 문제 해결

### 1. "fatal: not a git repository"

**원인:** Git 저장소가 초기화되지 않음
**해결:** `git init` 실행

### 2. "Changes not staged for commit"

**원인:** 파일이 스테이징되지 않음
**해결:** `git add .` 또는 `git add 파일명`

### 3. "failed to push some refs"

**원인:** 원격 저장소와 로컬이 동기화되지 않음
**해결:** `git pull --rebase origin main` 후 다시 푸시

### 4. "Merge conflict"

**해결 과정:**

```bash
# 충돌 파일 열어서 수정
# <<<<<<<, =======, >>>>>>> 표시 부분 수정
git add 충돌파일
git commit
```

## 고급 팁

### 1. Alias 설정

자주 사용하는 명령어를 단축어로 설정:

```bash
git config --global alias.st status
git config --global alias.ci commit
git config --global alias.br branch
git config --global alias.co checkout
```

### 2. Gitignore 템플릿

[gitignore.io](https://www.toptal.com/developers/gitignore)에서 다양한 환경에 맞는 .gitignore 템플릿을 생성할 수 있습니다.

### 3. Git GUI 도구

명령어가 익숙하지 않다면 GUI 도구를 사용해보세요:

- **GitHub Desktop**: 직관적인 인터페이스
- **GitKraken**: 강력한 기능
- **VS Code**: 내장 Git 기능

## 결론

Git은 처음에는 복잡해 보일 수 있지만, 기본 명령어 몇 개만 익혀도 충분히 사용할 수 있습니다. 이 가이드에서 소개한 명령어들만 잘 익혀도 대부분의 개발 작업을 문제없이 수행할 수 있습니다.

**기억할 핵심 명령어:**

- `git status`: 상태 확인
- `git add .`: 변경사항 스테이징
- `git commit -m "메시지"`: 커밋
- `git push origin main`: 푸시
- `git pull origin main`: 풀

Git을 활용하면 코드 관리와 협업이 훨씬 효율적으로 이루어집니다. 꾸준히 연습하면서 익숙해지도록 노력해보세요!

---

_더 자세한 내용은 [Git 공식 문서](https://git-scm.com/book/ko/v2)를 참고하시기 바랍니다._
