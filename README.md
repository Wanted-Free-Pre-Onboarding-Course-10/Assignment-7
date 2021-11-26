# Assignment-7
원티드 X 위코드 프리 온보딩 4주차 기업형 과제(카닥)
### 1. 배경 및 공통 요구사항

😁 **카닥에서 실제로 사용하는 프레임워크를 토대로 타이어 API를 설계 및 구현합니다.**
- 데이터베이스 환경은 별도로 제공하지 않습니다.
 **RDB중 원하는 방식을 선택**하면 되며, sqlite3 같은 별도의 설치없이 이용 가능한 in-memory DB도 좋으며, 가능하다면 Docker로 준비하셔도 됩니다.
- 단, 결과 제출 시 README.md 파일에 실행 방법을 완벽히 서술하여 DB를 포함하여 전체적인 서버를 구동하는데 문제없도록 해야합니다.
- 데이터베이스 관련처리는 raw query가 아닌 **ORM을 이용하여 구현**합니다.
- Response Codes API를 성공적으로 호출할 경우 200번 코드를 반환하고, 그 외의 경우에는 아래의 코드로 반환합니다.
### 2. API 요구 사항
- 사용자 생성 API
- 사용자가 소유한 타이어 정보를 저장하는 API
- 사용자가 소유한 타이어 정보 조회 API

### 3. 프로젝트 구조
- 기본 환경
  - IDE : VsCode 
  - OS : MAC
  - Git
- 웹 서버 어플리케이션 개발 환경
  - NodeJS
  - Express
  - TypeScript
  - TypeORM
- 데이터베이스
  - SQLite 
### 4. 디렉토리 구조

```bash

├── src
│   ├── app
│         ├── controller   (컨트롤러)
│         ├── definition   (사용자 정의 타입 폴더)
│         ├── entity       (DB 모델)
│         ├── jwt-util     (인증 로직)
│         ├── middlewares  (인증 및 에러 미들웨어)
│         ├── routes       (라우터)
│         ├── passport     (login 모듈)
│         ├── seed         (seedData)
│         ├── exception    (에러 클래스)
│         ├── swagger      (API 문서)
│         ├── index.ts 
│         └── app.ts
│
├── ormconfig.ts
├── package.json 
└── tsconfig.json 

``` 
    
### 5. API 명세
[API 명세서](https://app.swaggerhub.com/apis-docs/earthkingman/PreOnboardingCourse_CRUD_API/1.0.0#/)

[SeedData](https://github.com/earthkingman/CRUD-API-NodeJS/wiki/SeedData)
### 6. 빌드 및 실행 방법
- 파일명 변경 .env.sample ->  .env 
```
  mv .env.sample .env
  ```
- 명령어  (설치가 조금 오래 걸립니다. 조금만 기다려 주세요)
   ```shell
   npm i
   npm run api-docs
   npm start
   ```
- 접속

   http://localhost:3000/api-docs 

### 7.개발 보고서

 [보고서](https://github.com/earthkingman/CRUD-API-NodeJS/wiki)
