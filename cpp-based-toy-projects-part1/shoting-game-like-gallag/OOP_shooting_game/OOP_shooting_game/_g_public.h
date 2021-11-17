
#pragma once

//------------------------------------------------------------------------------
//	표준 언어 라이브러리 인클루드
//------------------------------------------------------------------------------
#include <conio.h>
#include <windows.h>
#include <stdio.h>
#include <stdlib.h>



//------------------------------------------------------------------------------
//	게임 라이브러리 인클루드
//------------------------------------------------------------------------------
//환경 설정 헤더 파일
#include "environment_setting.h"

//링크드 리스트 헤더 파일
#include "doubly_linked_list_like_stl.h"

//콘솔 제어 헤더 파일
#include "console.h"

//오브젝트 헤더 파일
#include "object.h"

//씬 관련 헤더 파일
#include "SceanManager.h"
#include "Scean.h"

//------------------------------------------------------------------------------
//	함수 선언부
//------------------------------------------------------------------------------
//버퍼 출력
void Bf_Out();



//키 처리 후 메시지 큐에 저장
void Cs_GetMsg();

//버퍼 로직 처리
//bool Bf_logic_process(CList<CObject*>::iterator *ptr_current_iter);