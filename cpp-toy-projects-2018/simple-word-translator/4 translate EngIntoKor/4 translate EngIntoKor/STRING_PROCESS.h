#pragma once

#include <iostream>
using namespace std;


//소문자 검사
bool IsLowerAlphabet(char const inChar)
{
	if ('a' <= inChar && 'z' >= inChar)
		return true;
	else
		return false;
}


//대문자 검사
bool IsUpperAlphabet(char const inChar)
{
	if ('A' <= inChar && 'Z' >= inChar)
		return true;
	else
		return false;
}


//소문자를 대문자로 변경
bool ToUpperAlphabet(char *inOutData)
{
	//소문자 검사
	if (!IsLowerAlphabet(*inOutData))
		return false;
	else
	{
		//대문자로 변경
		*inOutData = *inOutData - 32; // 
	}
}


//대문자를 소문자로 변경
bool ToLowerAlphabet(char *inOutData)
{
	//소문자 검사
	if (!IsUpperAlphabet(*inOutData))
		return false;
	else
	{
		//소문자로 변경
		*inOutData = *inOutData + 32; // 
	}
}


//알파벳인지 검사
bool IsAlphabet(char const inData)
{
	if ('a' <= inData && 'z' >= inData)
		return true;
	else if ('A' <= inData && 'Z' >= inData)
		return true;
	else
		return false;
}



//
//나중에 제작 할 것
///*------------------------
//입력 받은 문자열을 전부 소문자로 변경
//------------------------*/
//for (int i = 0; i <= inputLength; i++)
//{
//	ToLowerAlphabet(&inputString[i]);
//}



/*------------------------------------------------------------------------------------------------
	문자열 안을 단어 단위로 나눈다
	
	-src : 문자열을 대상
	-srcSz: src문자열의 길이
	-offset: 문자열의 시작 문자 위치
	-sz: 문자열의 해당 시작 offset부터 공백, 개행, 널 이전 까지의 크기

	-어떻게 false를 제작 할 것인가?

------------------------------------------------------------------------------------------------*/
bool SplitString(char * const src, const int srcLen, int offset, int *outSz)
{
	int sz = 0;
	for (int i = offset; i < srcLen; i++)
	{
		//개행, 널, 공백 검사
		if (src[i] == '\n' || src[i] == '\0' || src[i] == ' ')
		{
			*outSz = sz ;
			return true;
		}

		sz++;

	}
}