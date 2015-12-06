######################################################################
# data-visualization.js                                              #
# Created: 4 December 2015                                           #
# Authors: Jordan Christiansen                                       #
######################################################################
# This is a script that converts our csv file from data.gov to the   #
# GeoJSON format so that we can use it in d3.                        #
#                                                                    #
######################################################################

import os.path
import sys
import csv

def main():  
    if len(sys.argv) != 3:
        print_usage()

    # Check if the output file already exists
    if os.path.exists(sys.argv[2]):
        user_response = input(sys.argv[2] + ' already exists. Overwrite it? [y/N] ')
        if user_response == '' or user_response[0] != 'y':
            exit()

    # Strings containing the text of the resulting GeoJSON document.
    header  = ('{ "type": "FeatureCollection",\n'
               '\t"features": [\n')
    body    =  ''
    section = ('\t\t{{ "type": "Feature",\n'
               '\t\t\t"geometry": {{\n'
               '\t\t\t\t"type": "Point",\n'
               '\t\t\t\t"coordinates": [{}, {}]\n'
               '\t\t\t}},\n'
               '\t\t\t"properties": {{\n'
               '{}\n'
               '\t\t\t}}\n'
               '\t\t}},\n')
    properties_section = '\t\t\t\t"{}": "{}",\n'
    footer  = ('\t]\n'
               '}\n')

    # Parse the input file and build the string containing the body of the
    # GeoJSON document as we go.
    with open(sys.argv[1], 'r') as f:
        field_names = []
        csv_reader = csv.reader(f)
        for line in csv_reader:
            line_fields = line

            # Read the header line to get the field names if we haven't yet.
            if len(field_names) == 0:
                field_names = line_fields
            else:
                # Get the latitude and longitude.
                latitude = line_fields[25]
                longitude = line_fields[24]
                # Copy all of the properties of the CSV file to the GeoJSON
                # format.
                properties = ""
                for i in range(len(field_names)):
                    field = field_names[i].replace('"', '\"')
                    properties += (properties_section
                        .format(field_names[i], field))
                # Remove the final comma of the properties section.
                properties = properties[:properties.rfind(',')] + '\n'
                body += section.format(latitude, longitude, properties)

        # Remove the final comma from the body of the document.
        body = body[:body.rfind(',')] + '\n'

    # Write the resulting GeoJSON to a file.
    with open(sys.argv[2], 'w') as output_file:
        output_file.write(header + body + footer)

def print_usage():
    print(('{0}: Convert a CSV file to a collection of points in GeoJSON\n'
           'Usage: {0} CSV_FILE OUTPUT')
           .format(sys.argv[0]), file=sys.stderr)
    exit()

if __name__ == '__main__':
    main()
