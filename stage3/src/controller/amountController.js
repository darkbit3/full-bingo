const amountService = require('../service/amountService');

class AmountController {
  async getAmount30(req, res) {
    try {
      const data = await amountService.getAmountData(30);
      res.json({
        success: true,
        amount: 30,
        stage: 'stage3',
        data: data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async placeBet30(req, res) {
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

      if (betAmount !== 30) {
        return res.status(400).json({
          success: false,
          error: 'Invalid bet amount for stage3 (30-api)'
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
        amount: 30,
        stage: 'stage3',
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