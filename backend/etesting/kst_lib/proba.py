import pandas as pd
import numpy as np
import sys
sys.path.append('learning_spaces/')
from learning_spaces.kst import iita

def main():
    # default data
    default_data_frame = pd.DataFrame({'a': [1, 0, 1], 'b': [0, 1, 0], 'c': [0, 1, 1],'d': [1, 0, 1], 'e': [0, 1, 0]})
    # pisa data
    pisa_data_frame = pd.read_csv("pisa.txt", sep='\s+')
    pisa_data_frame.columns = default_data_frame.columns
    default_data_frame = default_data_frame.append(pisa_data_frame)
    response = iita(default_data_frame, v=1)
    print(response)
    # implications = links between nodes
    for source,target  in response["implications"]:
        print('REAL LINK')
        print('source:',source)
        print('target:',target)

    

if __name__ == "__main__":
    main()

