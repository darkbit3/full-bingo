const amountService = require('../service/amountService');

class AmountController {
  async getAmount20(req, res) {
    try {
      const data = await amountService.getAmountData(20);
      res.json({
        success: true,
        amount: 20,
        stage: 'stage2',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async placeBet20(req, res) {
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

      if (betAmount !== 20) {
        return res.status(400).json({
          success: false,
          error: 'Invalid bet amount for stage2 (20-api)'
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
        amount: 20,
        stage: 'stage2',
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