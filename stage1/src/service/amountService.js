class AmountService {
  async notifyDbManager(action, payload) {
    const dbManagerUrl = process.env.DB_MANAGER_URL;
    if (!dbManagerUrl) {
      throw new Error('DB_MANAGER_URL is not configured');
    }

    const response = await fetch(`${dbManagerUrl}/amount-callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action,
        stage: 'stage1',
        ...payload
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`DB manager returned ${response.status}: ${text}`);
    }

    return response.json();
  }

  async getAmountData(amount) {
    // Mock data for stage1 (10-api)
    const data = {
      amount: amount,
      stage: 'stage1',
      serverName: 'Stage 1 Server',
      connected: true,
      gameRules: {
        minBet: 10,
        maxBet: 10,
        payoutMultiplier: 2.5
      },
      timestamp: new Date().toISOString()
    };

    const dbManagerResponse = await this.notifyDbManager('info', { amount });
    return { ...data, dbManagerResponse };
  }

  async placeBet(payload) {
    const {
      playerId,
      betAmount,
      gameId,
      selectedBoard,
      winnerBoard,
      winnerPlayerId,
      payout,
      totalBet,
      owner,
      registeration,
      ga,
      me_data
    } = payload;

    const notifyPayload = {
      playerId,
      amount: betAmount,
      game_id: gameId,
      selected_board: selectedBoard,
      winner_board: winnerBoard,
      winnerplayerid: winnerPlayerId,
      payout: payout ?? betAmount * 2.5,
      total_bet: totalBet ?? betAmount,
      owner: owner ?? 0,
      registeration: registeration ?? {},
      ga: ga ?? {},
      me_data: me_data ?? {}
    };

    await this.notifyDbManager('bet', notifyPayload);

    const betId = `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return {
      betId,
      playerId,
      amount: betAmount,
      stage: 'stage1',
      status: 'placed',
      timestamp: new Date().toISOString(),
      potentialWin: notifyPayload.payout,
      selected_board: selectedBoard || null,
      game_id: gameId || `game_${Date.now()}`
    };
  }
}

module.exports = new AmountService();