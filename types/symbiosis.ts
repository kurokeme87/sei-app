import { Network, Token as IToken, TradeType } from "@/app/symbiosis/page";
import { Dispatch, SetStateAction } from "react";

export type TokenDetails = {
  token_address: string;
  symbol: string;
  name: string;
  logo: string;
  thumbnail: string;
  decimals: number;
  balance: string;
  possible_spam: boolean;
  verified_contract: boolean;
  total_supply: string | null;
  total_supply_formatted: string | null;
  percentage_relative_to_total_supply: number | null;
  security_score: number;
  balance_formatted: string;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  usd_value: number;
  usd_value_24hr_usd_change: number;
  native_token: boolean;
  portfolio_percentage: number;
};

export type Fee = {
  symbol: string;
  icon: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
};

export type Route = {
  symbol: string;
  icon: string;
  address: string;
  chainId: number;
  decimals: number;
};

export type FeeDetail = {
  provider: string;
  value: Fee;
  save: string | null;
  description: string;
};

export type Token = {
  symbol: string;
  icon: string;
  address: string;
  chainId: number;
  decimals: number;
};

export type RouteDetail = {
  provider: string;
  tokens: Token[];
};

export type TokenAmount = {
  symbol: string;
  icon: string;
  address: string;
  amount: string;
  chainId: number;
  decimals: number;
};

export type Tx = {
  chainId: number;
  data: string;
};

export type TSwapQuote = {
  fee: Fee;
  route: Route[];
  inTradeType: string;
  outTradeType: string;
  fees: FeeDetail[];
  routes: RouteDetail[];
  kind: string;
  priceImpact: string;
  tokenAmountOut: TokenAmount;
  tokenAmountOutMin: TokenAmount;
  amountInUsd: string | null;
  approveTo: string;
  type: string;
  rewards: any[];
  estimatedTime: number;
  tx: Tx;
};

export type ITokenSelector = {
  isWithMax?: boolean;
  label?: string;
  fetching?: boolean;
  amount?: string | number;
  onSelect?: (network: Network, token: IToken) => void;
  selectedNetwork?: Network;
  selectedNetwork2?: Network;
  setAmount?: Dispatch<SetStateAction<string | number>>;
  setSelectedNetwork?: Dispatch<SetStateAction<any>>;
  selectedToken?: any;
  setSelectedToken?: Dispatch<SetStateAction<any>>;
  tradeType: "EXACT_INPUT" | "EXACT_OUTPUT";
  setTradeType?: Dispatch<SetStateAction<TradeType>>;
};

export type TimeframeData = {
  transactions: number;
  addresses: number;
  amount_usd: number;
  timestamp: string; // ISO8601 date string
};

export type TStatisticsData = {
  updated_at: string; // ISO8601 date string
  total: TimeframeData;
  month: TimeframeData;
  week: TimeframeData;
  day: TimeframeData;
};

export type TransactionToken = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
};

type RouteToken = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
};

export type IRoute = {
  chain_id: number;
  amount: number;
  token: RouteToken;
};

export type TransactionDetails = {
  id: number;
  from_client_id: string;
  from_chain_id: number;
  from_tx_hash?: string;
  to_tx_hash: any;
  join_chain_id: number | null;
  join_tx_hash: string | null;
  to_chain_id: number;
  event_type: number;
  type: number;
  hash: string;
  state: number;
  created_at: string; // ISO8601 date string
  from_address: string;
  from_sender: string;
  to_address: string;
  amounts: number[];
  tokens: TransactionToken[];
  to_solana_address: string | null;
  to_solana_asset: string | null;
  to_solana_provider: string | null;
  to_solana_tx_hash: string | null;
  transit_token: any;
  from_amount_usd: number;
  to_amount_usd: number;
  to_tx_id: any;
  retry_active: boolean;
  to_is_lost: boolean;
  join_is_lost: boolean;
  from_is_lost: boolean;
  to_is_ignore: boolean;
  join_is_ignore: boolean;
  from_is_ignore: boolean;
  from_route?: IRoute[];
  to_route?: IRoute[];
  mined_at?: string;
  success_at?: any;
  duration: any;
  to_sender?: string;
  to_btc_provider?: any;
  to_btc_tx_hash?: any;
  last_retry_at?: any;
};

// Explorer
type TransToken = {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
};

export type ITransactionDetailsObject = {
  id: number;
  from_client_id: string;
  from_chain_id: number;
  from_tx_hash: string;
  join_chain_id: number | null;
  join_tx_hash: string | null;
  to_chain_id: number;
  event_type: number;
  type: number;
  hash: string;
  state: number;
  created_at: string;
  from_address: string;
  from_sender: string;
  to_address: string;
  amounts: number[];
  tokens: Token[];
  to_solana_address: string | null;
  to_solana_asset: string | null;
  to_solana_provider: string | null;
  to_solana_tx_hash: string | null;
  transit_token: string | null;
  from_amount_usd: number;
  to_amount_usd: number;
  to_tx_id: string | null;
  retry_active: boolean;
  to_is_lost: boolean;
  join_is_lost: boolean;
  from_is_lost: boolean;
  to_is_ignore: boolean;
  join_is_ignore: boolean;
  from_is_ignore: boolean;
};
