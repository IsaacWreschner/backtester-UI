import { TestSandbox } from "./sandbox";

export interface TestResultResponse {
    sandbox: TestSandbox; 
    positionsList: Position[];
    stats: Stats;
    additionalStats?: AdditionalStat[];
    balanceChart: chartData[];
    journalLog: journalLogs[];
}


export interface Result {
    positionsList: Position[];
    stats: Stats;
    additionalStats?: AdditionalStat[];
    balanceChart: chartData[];
    journalLogs: journalLogs[];
}

export interface chartData {
    date: string; 
    balance: number;
    profit: number;
}

export interface journalLogs {
    date: string; 
    message: string;
    level: 'info' | 'warn' | 'error';
}


export interface Stats {
    totalProfit: number;
    totalGain: number;
    totalLoss: number;
    totalTrades: number;
    winRate: number;
    gainLossRatio: number;
    highestProfit: number;
    highestLoss: number;
    highestConsecutiveProfit: number;
    highestConsecutiveLoss: number;
}

export interface AdditionalStat {
    name: string;
    value: number;
    description: string;
    unit: string; 
}


export interface Position {
    id: string;
    symbol: any;
    type: 'BUY' | 'SELL' ;
    price: number;
    lots: number;
    startedAt: Date;
    closedAt: Date;
    closePrice: number;
    profit: number;
}