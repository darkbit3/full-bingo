const amountService = require('../service/amountService');

class AmountController {
  async getAmount100(req, res) {
    try {
      const data = await amountService.getAmountData(100);
      res.json({
        success: true,
        amount: 100,
        stage: 'stage4',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async placeBet100(req, res) {
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

      if (betAmount !== 100) {
        return res.status(400).json({
          success: false,
          error: 'Invalid bet amount for stage4 (100-api)'
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
        amount: 100,
        stage: 'stage4',
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