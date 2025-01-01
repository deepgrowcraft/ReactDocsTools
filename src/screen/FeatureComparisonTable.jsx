const FeatureComparisonTable = () => {
  const features = [
    {
      name: "Unlimited Conversions",
      starter: false,
      basic: true,
      pro: true,
    },
    {
      name: "Ad-Free Experience",
      starter: false,
      basic: true,
      pro: true,
    },
    {
      name: "Priority Support",
      starter: false,
      basic: true,
      pro: true,
    },
    {
      name: "OCR Text Recognition",
      starter: false,
      basic: "limited",
      pro: true,
    },
    {
      name: "Advanced Editing Tools",
      starter: false,
      basic: "limited",
      pro: true,
    },
    {
      name: "Faster Processing Speed",
      starter: false,
      basic: true,
      pro: true,
    },
    {
      name: "File Merging Tools",
      starter: false,
      basic: true,
      pro: true,
    },
    {
      name: "Document Cropping",
      starter: false,
      basic: "limited",
      pro: true,
    },
    {
      name: "Add Watermark",
      starter: true,
      basic: true,
      pro: true,
    },
  ];

  return (
    <section className="py-12 mt-8 bg-white">
      <div className="container px-4 mx-auto">
        <h3 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Compare Features
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 font-medium text-left text-gray-700 border border-gray-300">
                  Feature
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-700 border border-gray-300">
                  Starter Plan
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-700 border border-gray-300">
                  Basic Plan
                </th>
                <th className="px-4 py-2 font-medium text-center text-gray-700 border border-gray-300">
                  Pro Plan
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="odd:bg-gray-50 even:bg-white">
                  <td className="px-4 py-2 text-gray-600 border border-gray-300">
                    {feature.name}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300">
                    {feature.starter ? (
                      <span className="font-bold text-green-500">&#10003;</span>
                    ) : (
                      <span className="font-bold text-red-500">&#10007;</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300">
                    {feature.basic === true ? (
                      <span className="font-bold text-green-500">&#10003;</span>
                    ) : feature.basic === "limited" ? (
                      <span className="font-bold text-yellow-500">Limited</span>
                    ) : (
                      <span className="font-bold text-red-500">&#10007;</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center border border-gray-300">
                    {feature.pro ? (
                      <span className="font-bold text-green-500">&#10003;</span>
                    ) : (
                      <span className="font-bold text-red-500">&#10007;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;
