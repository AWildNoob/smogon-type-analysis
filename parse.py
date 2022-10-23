import json

f = open("output_no_special.json")
data: dict = json.load(f)

for t in data.keys():
    data[t]["total"] = sum(data[t].values())
    data[t]["ou"] += data[t]["uber"]
    data[t]["uu"] += data[t]["ou"]
    data[t]["ru"] += data[t]["uu"]
    data[t]["nu"] += data[t]["ru"]
    data[t]["pu"] += data[t]["nu"]

print(",".join(data.keys()))
print(",".join([str(data[t]["pu"] / data[t]["total"]) for t in data.keys()]))
print(",".join([str(data[t]["nu"] / data[t]["total"]) for t in data.keys()]))
print(",".join([str(data[t]["ru"] / data[t]["total"]) for t in data.keys()]))
print(",".join([str(data[t]["uu"] / data[t]["total"]) for t in data.keys()]))
print(",".join([str(data[t]["ou"] / data[t]["total"]) for t in data.keys()]))
print(",".join([str(data[t]["uber"] / data[t]["total"]) for t in data.keys()]))
