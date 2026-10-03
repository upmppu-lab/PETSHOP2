My little Lisa PET TOWN — APK 빌드 도구 (v1.30)

⚠ 이 폴더에는 서명 키(key.pem)가 들어 있어요. AI Studio나 인터넷에 올리지 마세요!
   이 키로 서명해야 폰에 깔린 게임을 지우지 않고(세이브 유지) 업데이트할 수 있어요.

필요한 것: Python 3, Java, (테스트용) Node.js
  pip install cryptography apksigtool

빌드:
  1) AI Studio 등에서 고친 파일을 assets/ 폴더에 덮어쓰기
  2) python3 build_town.py 1.31 32      (버전이름, 버전코드 — 매번 숫자를 올려요)
  3) apk/ 폴더에 MyLittleLisaPetTown_v1.31.apk 가 생겨요 (_TEST.apk = 돈·레벨 최대 테스트판)

브라우저로 확인: node serve.js  →  http://localhost:8934
