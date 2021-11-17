#include "stdafx.h"
#include "lib_bit.h"
#include "stdio.h"


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
	unsigned int bit_offset = 1 << (cnt_bit-1);

	//모든 비트 마스크 비트 갯수
	unsigned int total_cnt_bit = cnt_bit;
	
	//MSB 부터 최하위까지 반복
	for (int i = 1 ; i <= total_cnt_bit ; i++) {

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





