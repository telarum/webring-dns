import toml
data = toml.load("dns.toml")

print("| Type | Key | Value |")
print("| --- | --- | --- |")

for item in data.get("data"):
    print("| "+item.get("type")+" | "+item.get("in")+" | "+item.get("out")+" |")