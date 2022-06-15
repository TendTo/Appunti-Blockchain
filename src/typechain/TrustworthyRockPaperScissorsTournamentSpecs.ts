/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface TrustworthyRockPaperScissorsTournamentSpecsInterface
  extends utils.Interface {
  functions: {
    "disputedMatches()": FunctionFragment;
    "movePaper()": FunctionFragment;
    "moveRock()": FunctionFragment;
    "moveScissor()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "disputedMatches"
      | "movePaper"
      | "moveRock"
      | "moveScissor"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "disputedMatches",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "movePaper", values?: undefined): string;
  encodeFunctionData(functionFragment: "moveRock", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "moveScissor",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "disputedMatches",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "movePaper", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "moveRock", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "moveScissor",
    data: BytesLike
  ): Result;

  events: {
    "MatchWonBy(uint8,uint8)": EventFragment;
    "TournamentWonBy(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MatchWonBy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TournamentWonBy"): EventFragment;
}

export interface MatchWonByEventObject {
  winner: number;
  numMatch: number;
}
export type MatchWonByEvent = TypedEvent<
  [number, number],
  MatchWonByEventObject
>;

export type MatchWonByEventFilter = TypedEventFilter<MatchWonByEvent>;

export interface TournamentWonByEventObject {
  winner: number;
}
export type TournamentWonByEvent = TypedEvent<
  [number],
  TournamentWonByEventObject
>;

export type TournamentWonByEventFilter = TypedEventFilter<TournamentWonByEvent>;

export interface TrustworthyRockPaperScissorsTournamentSpecs
  extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TrustworthyRockPaperScissorsTournamentSpecsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    disputedMatches(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    movePaper(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moveRock(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    moveScissor(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  disputedMatches(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  movePaper(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moveRock(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  moveScissor(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    disputedMatches(overrides?: CallOverrides): Promise<number>;

    movePaper(overrides?: CallOverrides): Promise<void>;

    moveRock(overrides?: CallOverrides): Promise<void>;

    moveScissor(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "MatchWonBy(uint8,uint8)"(
      winner?: null,
      numMatch?: null
    ): MatchWonByEventFilter;
    MatchWonBy(winner?: null, numMatch?: null): MatchWonByEventFilter;

    "TournamentWonBy(uint8)"(winner?: null): TournamentWonByEventFilter;
    TournamentWonBy(winner?: null): TournamentWonByEventFilter;
  };

  estimateGas: {
    disputedMatches(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    movePaper(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moveRock(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    moveScissor(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    disputedMatches(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    movePaper(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moveRock(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    moveScissor(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
