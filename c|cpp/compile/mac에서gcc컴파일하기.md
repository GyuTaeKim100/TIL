# mac에서 gcc 설치하기

## 작업 순서
  1. 필요 유틸리티 설치
	-gcc
        -bear
        -cmake
        -make
  1. 소스 코드 다운로드
1. 소스코드를 컴파일
  1. 북마크된 알고리즘 깃허브2 곳, Open ssl, strong swan 
  2. Bear 이용
  3. 컴파일 된 코드를 CROWN 2.0에서 테스트

## gcc 설치
1. xcode 설치
   ```
    xcode-select --install
   ``` 

2. 설치 확인
    ```
    gcc -v or gcc --version
    ```

## terminal에서 실행파일 실행
    ```
        ./프로그램이름
    ```

## make, cmake 설치
    ```
        brew install make
        brew install cmake

    ```

## cmake 명렁어
    ```
        make build
        cd build
        cmake ../
    ```

## make 명렁어
    ```
        cd build
        sudo make install
        sudo ldconfig
    ```

## 필요한 경우 bear 설정