import User from "../models/User.js";

export async function getWatchlist(req, res) {
  try {
    const user = await User.findById(req.user._id).populate("watchlist");
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
}

export async function toggleWatchlist(req, res) {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.user._id);

    const index = user.watchlist.findIndex((id) => id.toString() === movieId);
    if (index === -1) {
      user.watchlist.push(movieId);
    } else {
      user.watchlist.splice(index, 1);
    }

    await user.save();
    const updated = await User.findById(req.user._id).populate("watchlist");
    res.json(updated.watchlist);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ error: "Invalid movie ID" });
    }
    res.status(500).json({ error: "Failed to update watchlist" });
  }
}
