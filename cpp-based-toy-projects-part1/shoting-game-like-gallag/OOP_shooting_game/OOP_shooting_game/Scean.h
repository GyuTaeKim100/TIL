//------------------------------------------------------------------------------
//	클래스 계층도
//
//			    CSean
//		    /    /      |   
//		 CMenu   CStage1  CStatics 

//------------------------------------------------------------------------------

#pragma once

//------------------------------------------------------------------------------
//	표준 언어 라이브러리 인클루드
//------------------------------------------------------------------------------
#include <iostream>
using namespace std;

//------------------------------------------------------------------------------
//	게임 구성 라이브러리 인클루드
//------------------------------------------------------------------------------
//통합 라이브러리
#include "_g_public.h"


extern void Cs_GetMsg();
extern void Bf_Out();
extern void Bf_Init();

//extern CSceneManager g_scean_manager;


//------------------------------------------------------------------------------
//	신 클래스
//
//	:최상위 오브젝트
//	:공통 요소 모음
//------------------------------------------------------------------------------
class CScean {



public:
	virtual void Run() = 0;

	void Distroy()
	{
		delete(this);
	}

protected:
	virtual ~CScean()
	{

	}


};



//------------------------------------------------------------------------------
//	스테이지1 클래스
//
//	:최상위 오브젝트
//	:공통 요소 모음
//------------------------------------------------------------------------------
class CStage1 : public CScean {

protected:
	virtual ~CStage1()
	{

	}

public:

	CStage1()
	{

	}

	virtual void Run()
	{

		//------------------------------------------------------------------------------
		//	extern 전역 출력 버퍼
		//
		//	:초기화 모든 요소 '\0' 
		//------------------------------------------------------------------------------
		extern char g_buffer[SIZE_PLAY_SCREEN::PLAY_SCREEN_HEIGHT][SIZE_PLAY_SCREEN::PLAY_SCREEN_WIDTH];

		extern CList<CObject*>::iterator* g_buf_iter[SIZE_PLAY_SCREEN::PLAY_SCREEN_HEIGHT][SIZE_PLAY_SCREEN::PLAY_SCREEN_WIDTH];

		//------------------------------------------------------------------------------
		//	extern 전역 링크드 리스트
		//	
		//	:모든 오브젝트 요소 관리
		//------------------------------------------------------------------------------
		extern CList<CObject*> g_list_object;

		extern CList<CObject*>::iterator current_iter;

		//------------------------------------------------------------------------------
		//	플레이어 
		//
		//	:현재 2인용
		//------------------------------------------------------------------------------
		const int cnt_player = 2;
		CPlayer *g_ptr_player[cnt_player];


		//------------------------------------------------------------------------------
		//	콘솔 제어 위한 준비 작업 및 콘솔 초기 설정 
		//------------------------------------------------------------------------------			cs_Initial();
		cs_Initial();

		//적 생성 및 삽입
		CEnermy *new_enermy1 = new CEnermy("en", 5, 5, true, 1, UNIT_TYPE::ENERMY);
		g_list_object.push_back(new_enermy1);


		for (int i = 0; i < 6; i++)
		{
				//불렛 객체 생성
				//CBullet *new_bullet1 = new CBullet(0, i, true, BULLET_TYPE::STRAIGHT, DIRECTION_MOVE::MOVE_RIGHT);

				//불렛 객체 생성
				//CBullet *new_bullet2 = new CBullet(10, i, true, BULLET_TYPE::STRAIGHT, DIRECTION_MOVE::MOVE_LEFT);

				//불렛 삽입
				//g_list_object.push_back(new_bullet1);
				//g_list_object.push_back(new_bullet2);

				//CEnermy *new_enermy1 = new CEnermy("en", 5*i, 3, true, 1, UNIT_TYPE::ENERMY);
				//g_list_object.push_back(new_enermy1);
		}

		CPlayer *new_player1 = new CPlayer(NUM_PLAYER::FIRST_PLAYER, "pl", 7, 5, true, 1, UNIT_TYPE::PLAYER);
		g_list_object.push_back(new_player1);



		//적 생성 및 삽입
		//CEnermy *new_enermy1 = new CEnermy("en", 15, 5, true, 1, UNIT_TYPE::ENERMY);
		//g_list_object.push_back(new_enermy1);


		CEnermy *new_enermy2 = new CEnermy("en", 10, 2, true, 1, UNIT_TYPE::ENERMY);
		g_list_object.push_back(new_enermy2);

		CList<CObject*>::iterator end_iter;

		//두 미사일 간에 충돌 실험

		

		//마지막 이터레이터
		while (false == g_list_object.is_empty())
		{

			//키 입력 받음
			Cs_GetMsg();
			//커서 위치 설정
			cs_MoveCursor(0, 0);

			//버퍼 2종류 초기화
			memset(g_buffer, '\0', SIZE_PLAY_SCREEN::PLAY_SCREEN_HEIGHT * SIZE_PLAY_SCREEN::PLAY_SCREEN_WIDTH);
			memset(g_buf_iter, '\0', SIZE_PLAY_SCREEN::PLAY_SCREEN_HEIGHT * SIZE_PLAY_SCREEN::PLAY_SCREEN_WIDTH);

			//로직 파트
			current_iter = g_list_object.begin();
			end_iter = g_list_object.end();
			int len_list = g_list_object.size();
			for (int idx = 0; idx <len_list; idx++) {

				if (false == (*current_iter)->Action())
					current_iter++;

				len_list = g_list_object.size();
			}


			//출력
			Bf_Out();

			//대기
			Sleep(FRAME::PLAY_FRAME);


		}

	}
};




class CLogo : public CScean {


protected:
	virtual ~CLogo()
	{

	}

public:

	CLogo()
	{

	}

	virtual void Run()
	{

		cout << "로고 출력";
	
		Sleep(1000);


	}

};


class CEnd : public CScean {

public:

	CEnd()
	{

	}

	virtual void Run()
	{

		cout << "엔딩 출력";

		Sleep(5000);


	}

};