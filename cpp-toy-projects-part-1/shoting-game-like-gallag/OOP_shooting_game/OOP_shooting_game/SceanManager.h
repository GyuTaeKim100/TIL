#pragma once

#include "Scean.h"

class CSceneManager
{


private:

	CScean * _p_current_scean;

	//다음 스테이지 저장
	SCEAN _next_scean;

public:

	//생성자
	CSceneManager() 
	{
		_p_current_scean= new CLogo();
		_next_scean = SCEAN_LOGO;
	}
	
	//다음 신 로드
	bool LoadScean() 
	{
		switch (_next_scean)
		{
		case SCEAN::SCEAN_LOGO:
			_p_current_scean->Distroy();
			_p_current_scean = new CLogo();

			_next_scean = SCEAN::SCEAN_STAGE1;

			break;

		case SCEAN::SCEAN_STAGE1:
			_p_current_scean->Distroy();
			_p_current_scean = new CStage1();

			_next_scean = SCEAN::SCEAN_END;

			break;

		case SCEAN::SCEAN_END:
			_p_current_scean->Distroy();
			_p_current_scean = new CEnd();
			_next_scean = SCEAN::SCEAN_END;

			return false;
		}

		return true;
	}

	//다음 신 설정
	void SetNextScean(SCEAN next_scean)
	{
		_next_scean = next_scean;
	}

	//실행
	void Run()
	{
		//커서 위치 설정
		_p_current_scean->Run();
	}


	//게임 끝난 여부 파악
	bool IsFinish()
	{
		if (_next_scean == SCEAN::SCEAN_END)
			return true;
		else
			return false;
	}




};