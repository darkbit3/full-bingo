const amountService = require('../service/amountService');

class AmountController {
  async getAmount10(req, res) {
    try {
      const data = await amountService.getAmountData(10);
      res.json({
        success: true,
        amount: 10,
        stage: 'stage1',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async placeBet10(req, res) {
    try {
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
      } = req.body;

      if (betAmount !== 10) {
        return res.status(400).json({
          success: false,
          error: 'Invalid bet amount for stage1 (10-api)'
        });
      }

      const result = await amountService.placeBet({
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
      });

      res.json({
        success: true,
        amount: 10,
        stage: 'stage1',
        result: result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new AmountController();