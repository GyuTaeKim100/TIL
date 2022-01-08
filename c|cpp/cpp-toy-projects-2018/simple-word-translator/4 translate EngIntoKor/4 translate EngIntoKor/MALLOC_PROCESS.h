#pragma once

#include <iostream>
using namespace std;




/*
동적할당 2차원 배열 출력 부분
		
		-이중배열 출력 함수
		-행과 열 방식 출력
*/
void DisplayDynamicAllocChar(char ** const map, int maxY, int maxX)
{
	for (int i = 0; i < maxY; i++)
	{
		for (int j = 0; j < maxX; j++)
			printf("%c", map[i][j]);
		printf("\n");


	}
}




/*
동적 이차원 배열 내 요소가 인자와 같은지 비교
	
		-동적 할당된 배열의 해당 행과 열에 존재하는 요소가 인자 matchingElement와 같은지 비교
*/
template <typename DATA_TYPE>
bool compareElementInDynamicAlloc(const DATA_TYPE **map, int checkY, int checkX, DATA_TYPE matchingElement)
{
	if (map[checkY][checkX] == matchingElement)
	{
		return true;
	}
	return false;
}





/*

동적 이차원 배열 복사

*/
template <typename DATA_TYPE>
bool copyDualAlloc(DATA_TYPE ** const source, DATA_TYPE **dest, int y, int x)
{
	//예외 처리
	if (source == NULL || dest == NULL)
		return false;
	if (y < 0 || x < 0)
		return false;

	for (int i = 0; i < y; i++)
	{
		memcpy(dest[i], source[i], x);

	}

	return true;
}






/*

동적 이차원 배열 범위 검사

		-동적할당 배열의 할당 범위 체크
		-나중에 유닛 테스트 해볼 것
*/
template <typename DATA_TYPE>
bool checkRangeOfDualAlloc(DATA_TYPE ** const map, int checkY, int checkX, int maxY, int maxX)
{
	////배열 범위 가능 체크
	//if ( (0 <= checkY && checkY < maxY) && (0 <= checkX && checkX < maxX) )
	//{
	//	//해당 배열의 크기 체크
	//	if (sizeof(map) <= sizeof(DATA_TYPE)*checkX *checkY )
	//		return false;
	//	else
	//		return true;
	//}
	//else
	//	return false;

	//배열 범위 가능 체크
	if ((0 <= checkY && checkY < maxY) && (0 <= checkX && checkX < maxX))
	{
		return true;
	}
	else
		return false;

}




/*
	이중 동적할당 생성
*/
template <typename DATA_TYPE>
bool initDualAlloc(DATA_TYPE *** map, int y, int x)
{
	*map = (DATA_TYPE**)malloc(sizeof(DATA_TYPE*)*y);

	if (*map == NULL)
		false;

	for (int i = 0; i < y; i++)
	{
		(*map)[i] = (DATA_TYPE*)malloc(sizeof(DATA_TYPE)*x);

		if ((*map)[i] == NULL)
			false;
	}

	return true;
}




