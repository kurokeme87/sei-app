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
