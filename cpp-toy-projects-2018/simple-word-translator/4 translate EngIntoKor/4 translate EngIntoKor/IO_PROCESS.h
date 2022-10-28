#pragma once

#include <stdlib.h>

#include <windows.h>

#include <iostream>
using namespace std;



/*

	일차원 배열 출력 부분 시작

*/

//배열 출력 함수
//	배열의 출력 시작 번지가 리틀엔디안 방식
//	현재는 3자리 숫자 까지만 가능 --->나중에 수정 할 것
template <typename DATA_TYPE>
void DisplayStartPointArr(DATA_TYPE * const  arr, int arrSz)
{

	//인자의 스트링 값을 %5d 형식으로 넣자

	for (int i = 0; i < arrSz; i++)
		printf("%3d ", arr[i]);

	printf("\n");
}




//배열 출력 함수2
//	배열의 출력 시작 번지가 빅엔디안 방식
//	현재는 3자리 숫자 까지만 가능 --->나중에 수정 할 것
template <typename DATA_TYPE>
void DisplayEndPointArr(DATA_TYPE * const arr, int arrSz)
{

	for (int i = arrSz - 1; i >= 0; i--)
		printf("%3d  ", arr[i]);

	printf("\n");
}
/*

일차원 배열 출력 부분 끝

*/







/*

동적할당 2차원 배열 색상 출력

*/
//페인트 맵 출력 함수
//	행과 열 방식 출력
//  색깔 이용
void DisplayPaintMap(char ** const map, int maxY, int maxX, int nowX, int nowY)
{



	int kindOfColor;
	for (int i = 0; i < maxY; i++)
	{
		for (int j = 0; j < maxX; j++)
		{



			//빈공간이 아닐 때
			if (map[i][j] != ' ')
			{
				kindOfColor = (map[i][j]);
				//printf("%d", kindOfColor);

				//색상 선택
				switch (kindOfColor)
				{

					//blue
				case 1:
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 1);
					break;

					//green
				case 2:
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 2);
					break;

					//blue
				case 4:
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 4);
					break;

					//yellow
				case 6:
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 6);
					break;

					//white
				case 7:
					SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
					break;

				}

				if (i == nowY && j == nowX)
					cout << "▼"; //칠 할 곳 표시
				else
					cout << "■";
			}
			else//빈 공간 일 때
				cout << "  ";


			//원래 색으로 복구
			SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
		}
		cout << "\n";
	}

	//원래 콘솔 색으로 변경
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
}
















//
////미완 !! 나중에 !!
//template <typename DATA_TYPE>
//bool pauseBeforeDisireInput(DATA_TYPE compare)
//{
//	DATA_TYPE input=0;
//
//	printf("input n: nextStep");
//
//	fflush(stdin);
//	fflush(stdout);
//
//	while (true)
//	{
//		input=getchar();
//
//		if (input == compare)
//			break;
//	}
//
//	return true;
//}


