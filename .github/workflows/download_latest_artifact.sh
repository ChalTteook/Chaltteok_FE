# 리포지토리 소유자와 이름 설정
REPO_OWNER="ChalTteook"
REPO_NAME="Chaltteok_FE"

# 최신 워크플로우 실행 ID 가져오기
RUN_ID=$(gh run list -R $REPO_OWNER/$REPO_NAME --limit 1 --json databaseId --jq '.[0].databaseId')

# 아티팩트 다운로드
gh run download $RUN_ID -n app -R $REPO_OWNER/$REPO_NAME

echo "아티팩트 다운로드 완료: $RUN_ID"