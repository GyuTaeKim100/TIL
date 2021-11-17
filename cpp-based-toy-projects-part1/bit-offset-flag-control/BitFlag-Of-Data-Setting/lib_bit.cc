#pragma once
#include "stdafx.h"

#include "lib_bit.h"

/**
@return bool :  정상 작동시 true, 아닌 경우 false

@param src_num : 2진 바이너리로 출력 할 값

@brief 10진수 값을 2진수 비트 단위로 출력한다.

@todo 예외 처리 미완
*/
bool DisplayNumToBit(unsigned int src_num) {

	//해당 자료형의 비트 갯수 구하기
	unsigned int cnt_bit = sizeof(src_num) * 8;

	//비트 MSB오프셋 설정
	unsigned int bit_offset = 1 << (cnt_bit - 1);

	//모든 비트 마스크 비트 갯수
	unsigned int total_cnt_bit = cnt_bit;

	//MSB 부터 최하위까지 반복
	for (int i = 1; i <= total_cnt_bit; i++) {

		//비트 마스크 연산
		if (src_num & bit_offset) {

			putchar('1');
		}
		else {

			putchar('0');
		}

		//8비트 단위로 공백 간격 출력!
		if (0 == (i % 8)) {

			putchar(' ');
		}

		bit_offset = bit_offset >> 1;
	}

	putchar('\n');

	return true;
}







/**
@return bool :  정상 작동시 true, 아닌 경우 false

@param data : 2진 비트 오프셋 연산 대상
@param target_bit_offset : data의 2진 비트 오프셋
@param set_bit_flag : true시 flag on, false시 flag off

@brief 데이터 값의 2진 비트 플래그의 오프셋의 값을 변경한다.
*/
bool SetBitFlag(unsigned int *data, unsigned int target_bit_offset, bool set_bit_flag) {

	//예외처리 : 값이 표현 가능한 비트 오프셋 범위 체크 체크
	int available_bit_cnt = sizeof(*data) * 8;

	//insigend int형은 비트가 0의 자릿수부터 31의 자릿수까지 표현 가능
	if (available_bit_cnt <= target_bit_offset) {

		return false;
	}

	int offset_bit = 1 << (target_bit_offset);

	//기존 비트 오프셋의 비트 플래그가 1인 경우
	if (*data & offset_bit) {

		//해당 비트 오프셋을 값을 0으로 변경하는 경우
		if (false == set_bit_flag) {

			*data = *data & (~offset_bit);
		}
	}
	//기존 비트 오프셋의 비트 플래그가 0인 경우
	else {

		//해당 비트 오프셋 값을 1으로 변경하는 경우
		if (true == set_bit_flag) {

			*data = *data | (offset_bit);
		}
	}

	return true;
}

