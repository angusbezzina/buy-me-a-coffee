/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace BuyMeACoffee {
  export type MemoStruct = {
    from: AddressLike;
    timestamp: BigNumberish;
    name: string;
    message: string;
  };

  export type MemoStructOutput = [
    from: string,
    timestamp: bigint,
    name: string,
    message: string
  ] & { from: string; timestamp: bigint; name: string; message: string };
}

export interface BuyMeACoffeeInterface extends Interface {
  getFunction(
    nameOrSignature: "buyCoffee" | "getMemos" | "memos" | "withdrawTips"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "NewMemo"): EventFragment;

  encodeFunctionData(
    functionFragment: "buyCoffee",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "getMemos", values?: undefined): string;
  encodeFunctionData(functionFragment: "memos", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "withdrawTips",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "buyCoffee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getMemos", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "memos", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTips",
    data: BytesLike
  ): Result;
}

export namespace NewMemoEvent {
  export type InputTuple = [
    from: AddressLike,
    timestamp: BigNumberish,
    name: string,
    message: string
  ];
  export type OutputTuple = [
    from: string,
    timestamp: bigint,
    name: string,
    message: string
  ];
  export interface OutputObject {
    from: string;
    timestamp: bigint;
    name: string;
    message: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BuyMeACoffee extends BaseContract {
  connect(runner?: ContractRunner | null): BuyMeACoffee;
  waitForDeployment(): Promise<this>;

  interface: BuyMeACoffeeInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  buyCoffee: TypedContractMethod<
    [_name: string, _message: string],
    [void],
    "payable"
  >;

  getMemos: TypedContractMethod<[], [BuyMeACoffee.MemoStructOutput[]], "view">;

  memos: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, string] & {
        from: string;
        timestamp: bigint;
        name: string;
        message: string;
      }
    ],
    "view"
  >;

  withdrawTips: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyCoffee"
  ): TypedContractMethod<[_name: string, _message: string], [void], "payable">;
  getFunction(
    nameOrSignature: "getMemos"
  ): TypedContractMethod<[], [BuyMeACoffee.MemoStructOutput[]], "view">;
  getFunction(
    nameOrSignature: "memos"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, string, string] & {
        from: string;
        timestamp: bigint;
        name: string;
        message: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "withdrawTips"
  ): TypedContractMethod<[], [void], "nonpayable">;

  getEvent(
    key: "NewMemo"
  ): TypedContractEvent<
    NewMemoEvent.InputTuple,
    NewMemoEvent.OutputTuple,
    NewMemoEvent.OutputObject
  >;

  filters: {
    "NewMemo(address,uint256,string,string)": TypedContractEvent<
      NewMemoEvent.InputTuple,
      NewMemoEvent.OutputTuple,
      NewMemoEvent.OutputObject
    >;
    NewMemo: TypedContractEvent<
      NewMemoEvent.InputTuple,
      NewMemoEvent.OutputTuple,
      NewMemoEvent.OutputObject
    >;
  };
}
