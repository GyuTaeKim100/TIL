#pragma once

#include <stdlib.h>

#include <windows.h>

#include <iostream>
using namespace std;



/*

	������ �迭 ��� �κ� ����

*/

//�迭 ��� �Լ�
//	�迭�� ��� ���� ������ ��Ʋ����� ���
//	����� 3�ڸ� ���� ������ ���� --->���߿� ���� �� ��
template <typename DATA_TYPE>
void DisplayStartPointArr(DATA_TYPE * const  arr, int arrSz)
{

	//������ ��Ʈ�� ���� %5d �������� ����

	for (int i = 0; i < arrSz; i++)
		printf("%3d ", arr[i]);

	printf("\n");
}




//�迭 ��� �Լ�2
//	�迭�� ��� ���� ������ �򿣵�� ���
//	����� 3�ڸ� ���� ������ ���� --->���߿� ���� �� ��
template <typename DATA_TYPE>
void DisplayEndPointArr(DATA_TYPE * const arr, int arrSz)
{

	for (int i = arrSz - 1; i >= 0; i--)
		printf("%3d  ", arr[i]);

	printf("\n");
}
/*

������ �迭 ��� �κ� ��

*/







/*

�����Ҵ� 2���� �迭 ���� ���

*/
//����Ʈ �� ��� �Լ�
//	��� �� ��� ���
//  ���� �̿�
void DisplayPaintMap(char ** const map, int maxY, int maxX, int nowX, int nowY)
{



	int kindOfColor;
	for (int i = 0; i < maxY; i++)
	{
		for (int j = 0; j < maxX; j++)
		{



			//������� �ƴ� ��
			if (map[i][j] != ' ')
			{
				kindOfColor = (map[i][j]);
				//printf("%d", kindOfColor);

				//���� ����
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
					cout << "��"; //ĥ �� �� ǥ��
				else
					cout << "��";
			}
			else//�� ���� �� ��
				cout << "  ";


			//���� ������ ����
			SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
		}
		cout << "\n";
	}

	//���� �ܼ� ������ ����
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), 7);
}
















//
////�̿� !! ���߿� !!
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


