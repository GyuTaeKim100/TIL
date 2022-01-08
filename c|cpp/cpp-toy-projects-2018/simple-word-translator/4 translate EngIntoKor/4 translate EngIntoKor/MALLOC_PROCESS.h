#pragma once

#include <iostream>
using namespace std;




/*
�����Ҵ� 2���� �迭 ��� �κ�
		
		-���߹迭 ��� �Լ�
		-��� �� ��� ���
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
���� ������ �迭 �� ��Ұ� ���ڿ� ������ ��
	
		-���� �Ҵ�� �迭�� �ش� ��� ���� �����ϴ� ��Ұ� ���� matchingElement�� ������ ��
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

���� ������ �迭 ����

*/
template <typename DATA_TYPE>
bool copyDualAlloc(DATA_TYPE ** const source, DATA_TYPE **dest, int y, int x)
{
	//���� ó��
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

���� ������ �迭 ���� �˻�

		-�����Ҵ� �迭�� �Ҵ� ���� üũ
		-���߿� ���� �׽�Ʈ �غ� ��
*/
template <typename DATA_TYPE>
bool checkRangeOfDualAlloc(DATA_TYPE ** const map, int checkY, int checkX, int maxY, int maxX)
{
	////�迭 ���� ���� üũ
	//if ( (0 <= checkY && checkY < maxY) && (0 <= checkX && checkX < maxX) )
	//{
	//	//�ش� �迭�� ũ�� üũ
	//	if (sizeof(map) <= sizeof(DATA_TYPE)*checkX *checkY )
	//		return false;
	//	else
	//		return true;
	//}
	//else
	//	return false;

	//�迭 ���� ���� üũ
	if ((0 <= checkY && checkY < maxY) && (0 <= checkX && checkX < maxX))
	{
		return true;
	}
	else
		return false;

}




/*
	���� �����Ҵ� ����
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




