
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

const priceMap = {
  "4.37": "2.50", "4.40": "2.53", "4.44": "2.56", "4.47": "2.58", "4.51": "2.61",
  "4.54": "2.64", "4.58": "2.67", "4.61": "2.69", "4.65": "2.72", "4.68": "2.75",
  "4.72": "2.77", "4.75": "2.80", "4.79": "2.83", "4.82": "2.86", "4.86": "2.88",
  "4.89": "2.91", "4.93": "2.94", "4.96": "2.97", "5.00": "3.00", "5.04": "3.02",
  "5.07": "3.05", "5.11": "3.08", "5.14": "3.11", "5.18": "3.14", "5.21": "3.17",
  "5.25": "3.20", "5.28": "3.23", "5.32": "3.25", "5.35": "3.28", "5.39": "3.31",
  "5.42": "3.34", "5.46": "3.37", "5.49": "3.40", "5.53": "3.43", "5.56": "3.46",
  "5.60": "3.49", "5.63": "3.52", "5.67": "3.55", "5.70": "3.58", "5.74": "3.61",
  "5.77": "3.64", "5.81": "3.67", "5.85": "3.70", "5.88": "3.73", "5.92": "3.76",
  "5.95": "3.79", "5.99": "3.83", "6.02": "3.85", "6.06": "3.88", "6.09": "3.91",
  "6.13": "3.94", "6.16": "3.97", "6.20": "4.00", "6.23": "4.03", "6.27": "4.06",
  "6.30": "4.09", "6.34": "4.11", "6.37": "4.14", "6.41": "4.17", "6.44": "4.20",
  "6.48": "4.23", "6.51": "4.26", "6.55": "4.29", "6.58": "4.32", "6.62": "4.35",
  "6.65": "4.38", "6.69": "4.41", "6.73": "4.44", "6.76": "4.47", "6.80": "4.50",
  "6.83": "4.53", "6.87": "4.56", "6.90": "4.59", "6.94": "4.62", "6.97": "4.65",
  "7.01": "4.68", "7.04": "4.71", "7.08": "4.75", "7.11": "4.78", "7.15": "4.81",
  "7.18": "4.84", "7.22": "4.87", "7.25": "4.90", "7.29": "4.93", "7.32": "4.96",
  "7.36": "4.99", "7.39": "5.03", "7.43": "5.06", "7.46": "5.09", "7.50": "5.11",
  "7.54": "5.14", "7.57": "5.16", "7.61": "5.18", "7.64": "5.21", "7.68": "5.23",
  "7.71": "5.26", "7.75": "5.28", "7.78": "5.30", "7.82": "5.33", "7.85": "5.35",
  "7.89": "5.38", "7.92": "5.40", "7.96": "5.42", "7.99": "5.45", "8.03": "5.47",
  "8.06": "5.50", "8.10": "5.52", "8.13": "5.54", "8.17": "5.57", "8.20": "5.59",
  "8.24": "5.62", "8.27": "5.64", "8.31": "5.66", "8.35": "5.69", "8.38": "5.71",
  "8.42": "5.74", "8.45": "5.76", "8.49": "5.78", "8.52": "5.81", "8.56": "5.83",
  "8.59": "5.86", "8.63": "5.88", "8.66": "5.90", "8.70": "5.93", "8.73": "5.95"
};

export default function MarketPriceApp() {
  const [marketPrice, setMarketPrice] = useState("");
  const [settlementPrice, setSettlementPrice] = useState("");
  const [adjustedPrice, setAdjustedPrice] = useState("");

  const handleInputChange = (e) => {
    const rawInput = e.target.value;
    setMarketPrice(rawInput);

    const parsed = parseFloat(rawInput);
    if (isNaN(parsed)) {
      setSettlementPrice("");
      setAdjustedPrice("");
      return;
    }

    const roundedKey = parsed.toFixed(2).toString();
    const settlement = priceMap[roundedKey];

    setSettlementPrice(settlement || "");

    if (settlement) {
      const adjusted = (parseFloat(settlement) - 4.97).toFixed(2);
      setAdjustedPrice(adjusted);
    } else {
      setAdjustedPrice("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Market Price Lookup</h2>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter Market Price (e.g. 4.33)"
            value={marketPrice}
            onChange={handleInputChange}
          />
          <div>
            <strong>Settlement Price (B):</strong> {settlementPrice || "N/A"}
          </div>
          <div>
            <strong>Adjusted Price (C = B - 4.97):</strong> {adjustedPrice || "N/A"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
