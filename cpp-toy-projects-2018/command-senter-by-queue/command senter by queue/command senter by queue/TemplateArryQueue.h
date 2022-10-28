#pragma once

#include <iostream>

using namespace std;


template<typename DATA_TYPE>
class ELEMENT_Q
{
private:
	//삽입 시간
	long long inputTime;

	//삽입 순서 번호
	long sequence;

	//삽입 데이터
	DATA_TYPE *data;

public:

	//생성자
	ELEMENT_Q(long long facTime, long facSeq, DATA_TYPE *inData)
	{
		inputTime = facTime;
		sequence = facSeq;
		data = inData;
	}

	long long GetInputTime()
	{
		return inputTime;
	}

	long GetSequence()
	{
		return sequence;
	}

	DATA_TYPE* GetData()
	{
		return data;
	}

};


template <typename DATA_TYPE>
class circularQueue
{
private:
	int front;
	int rear;

	//큐 배열 이중 포인터
	ELEMENT_Q<DATA_TYPE> **elementArr;
	
	//총 큐 크기
	long totalSz;

	//현재 요소 갯수
	long nowCnt;

	//총 삽입 갯수
	long totalSequence;


public:
	//생성자 
	circularQueue(long sz)
	{
		front = 0;
		rear = 0;

		totalSz = sz;

		//이중 배열 동적 할당
		elementArr = (ELEMENT_Q<DATA_TYPE>**)malloc(sizeof(ELEMENT_Q<DATA_TYPE>*) *sz);
		

		if (elementArr == NULL)
			cout<<"error";

		totalSequence = 0;
	}


	//빈 여부 체크
	bool IsEmpty()
	{
		if (nowCnt == 0)
			return true;
		else
			return false;
	}


	//가득 찬 여부 체크
	bool IsFull()
	{
		if (nowCnt == totalSz)
			return true;
		else
			return false;
	}


	//현재 포지션 인덱스에서 다음 포지션 인덱스 반환
		//인자 값에 따라 front, rear 다 가능
	inline long GetNextIndex(int *nowPosition)
	{
		return ( (*nowPosition)++) % totalSz;
	}


	//현재 포지션 인덱스에서 +moveInterval 인덱스 반환
		//인자 값에 따라 front, rear 다 가능
	inline long GetNextIndex(int nowPosition, int moveInterval)
	{
		return (nowPosition + moveInterval) % totalSz;
	}


	//삽입
	bool Enqueue(DATA_TYPE *inData, long long inputTime)
	{
		//가득 찬 경우 
			//삽입 불가
		if (IsFull())
			return false;

		//삽입 요소 생성
		//static ELEMENT_Q<DATA_TYPE> *NEW_ELEMENT = new ELEMENT_Q<DATA_TYPE>(inputTime,  totalSequence++, inData);

	

		//큐에 저장
		elementArr[ GetNextIndex(&rear) ] = new ELEMENT_Q<DATA_TYPE>(inputTime, totalSequence++, inData);

		//삽입 요소 개수 증가
		nowCnt++;
		
		return true;
	}

	//삭제
	bool Dequeue(DATA_TYPE *outData)
	{
		if (IsEmpty())
		{
			return false;
		}

		//삽입 요소 개수 감소
		nowCnt--;

		DATA_TYPE *returnData = elementArr[GetNextIndex(&front)]->GetData();
		*outData = *returnData;

		return true;
	}


	//삭제
	bool Dequeue(DATA_TYPE *outData, int index)
	{
		if (IsEmpty())
		{
			return false;
		}

		//삽입 요소 개수 감소
		nowCnt--;

		DATA_TYPE *returnData = elementArr[GetNextIndex(&front), index]->GetData();


		//나중에 처리 할 것!!
		//
		//int k = front + index;
		//int j = k %totalQueueCnt;

		////남은 것 만큼 당겨야 한다
		//for (int i = k; i < totalQueueCnt; )
		//{
		//	elementArr[i % totalQueueCnt] = elementArr[GetNextIndex(&k)];

		//	i = (i++) & totalQueueCnt;
		//}


		*outData = *returnData;


		return true;
	}


	
	bool PeekDataByPos(DATA_TYPE *outData, long pos)
	{
		if (pos > nowCnt-1)
		{
			return false;
		}


		DATA_TYPE *returnData = elementArr[GetNextIndex(front, pos)]->GetData();
		*outData = *returnData;

		return true;
	}


	bool PeekTimeByPos(long long *outTime, long pos)
	{
		if (pos > nowCnt - 1)
		{
			return false;
		}


		long long returnTime = elementArr[GetNextIndex(front, pos)]->GetInputTime();
		*outTime = returnTime;

		return true;
	}


};