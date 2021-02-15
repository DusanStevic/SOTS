import pandas as pd
import numpy as np
import sys
sys.path.append('learning_spaces/')
from learning_spaces.kst import iita
data_frame = pd.DataFrame({'a': [1, 0, 1], 'b': [0, 1, 0], 'c': [0, 1, 1]})
response = iita(data_frame, v=1)
print(response)