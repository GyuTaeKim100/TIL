//미완
//	q 부분 dequeue ( o , index) 부분 수정 할 것!!


#pragma once


#include "stdafx.h"

#include "TemplateArryQueue.h"

#include <iostream>

#include <windows.h>


#include "stdio.h"
#include "time.h"


//for kbhit
#include <conio.h>
using namespace std;



//유닛 구조체
typedef struct UnitInfo {
	int hp; //유닛 체력
	char name[10]; //유닛 이름
	long long  creationTime; //유닛 생성 시간
}UnitInfo;

//커멘드 센터 정보
typedef enum comandInfo
{
	totalQueueCnt = 10,
	totalUnitCnt = 10

}comandInfo;

//유닛 설정
UnitInfo units[totalUnitCnt] = {
	{ 10, "gyutae0", 10},
	{ 20, "gyutae1", 20 },
	{ 30, "gyutae2", 30 },
	{ 40, "gyutae3", 40 },
	{ 50, "gyutae4", 50 },
	{ 60, "gyutae5", 60 },
	{ 70, "gyutae6", 70 },
	{ 80, "gyutae7", 80 },
	{ 90, "gyutae8", 90 },
	{ 100, "gyutae9", 100 }
};


//함수 원형
void DisplayScreen(circularQueue<UnitInfo> * commandSenter);




//현재 클록
static clock_t current_tick;
static double currentSec_sec;


int main()
{

	//커멘드 센터 큐 생성
	circularQueue<UnitInfo> commandSenter(totalQueueCnt);

	int strokeKey = -1;




	while (true)
	{



		//현재 시간 측정
		current_tick = clock();
		currentSec_sec = current_tick / CLOCKS_PER_SEC;


		//키처리
		if (_kbhit())
		{
			strokeKey = getc(stdin);

			//유닛 생성
			if (strokeKey >= '0' && strokeKey <= '0'+ totalUnitCnt )
			{
				//입력 키 정수화
				static int ikey;
				ikey = strokeKey - '0';

				//생성 유닛 선언 및 초기화
				UnitInfo * newUnit = new UnitInfo();
				newUnit->hp = units[ikey].hp;
				strcpy_s(newUnit->name, units[ikey].name);
				newUnit->creationTime = units[ikey].creationTime;

				
				//큐에 넣는다
				commandSenter.Enqueue(newUnit, currentSec_sec);
			}

			

			//종료
			else if (strokeKey == 'x')
			{
				break;
			}
		}


		//큐에 들어간 시간
		long long inputTime;
		//해당 유닛 생성에 필요한 시간
		long long unitCreationTime;
		
		//peek Unit 
		UnitInfo peekUnit;
		int qIndex = 0;
		qIndex = 0;

		//로직
		//생산 완료 시 출력
		while (commandSenter.PeekTimeByPos(&inputTime, qIndex))
		{
			commandSenter.PeekTimeByPos(&inputTime, qIndex);
			commandSenter.PeekDataByPos(&peekUnit, qIndex);
			unitCreationTime = peekUnit.creationTime;

			int fercent = ((currentSec_sec - inputTime) / unitCreationTime) * 100;

			if (fercent >= 100)
			{
				commandSenter.Dequeue(&peekUnit, qIndex);
				cout << "유닛 생성:" << peekUnit.name << " " << peekUnit.hp << endl;
			}

			qIndex++;			
		}

		//출력
			DisplayScreen(&commandSenter);
		

		//타이머			
			Sleep(1000);

	}

}



void DisplayScreen(circularQueue<UnitInfo> * commandSenter)
{

	//화면 지우기
	system("cls");

	cout << "[1~ 9: 유닛 별 생산 단축키 / x : 종료 ]" << endl << endl;
	cout << "-- Control Tower Unit Create --" << endl;
	for (int i = 0; i < totalQueueCnt; i++)
	{
		cout << "|--------|";

	}
	cout << endl;

	UnitInfo circuitUnit;

	//이름 출력
	for (int i = 0; i < totalQueueCnt; i++)
	{
		if (commandSenter->PeekDataByPos(&circuitUnit, i))
		{
			cout << "|";
			printf("%-8s", circuitUnit.name);
			cout << "|";
		}
	}
	cout << endl;

	//hp 출력
	for (int i = 0; i < totalQueueCnt; i++)
	{
		if (commandSenter->PeekDataByPos(&circuitUnit, i))
		{
			cout << "|";
			printf("hp:%-5d", circuitUnit.hp);
			cout << "|";
		}
	}
	cout << endl;



	int fercent = -1;
	//생성 % 출력
	for (int i = 0; i < totalQueueCnt; i++)
	{
		long long inputTime = -1;
		if (commandSenter->PeekDataByPos(&circuitUnit, i))
		{
			commandSenter->PeekTimeByPos(&inputTime, i);
			fercent = ((currentSec_sec- inputTime) / circuitUnit.creationTime) * 100 ;
			printf("l%5d(%%)", fercent);
			cout << "|";
		}
	}
	cout << endl;



	for (int i = 0; i < totalQueueCnt; i++)
	{
		cout << "|--------|";

	}
	cout << endl;
}

