file = open("testing_ignore/memrisefile.txt", "r")

lines = file.readlines()
lines = str(lines)
lines.replace("\n", "")
print(lines)